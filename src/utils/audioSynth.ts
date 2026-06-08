// Native browser Web Audio API ambient synthesizer
// Synthesizes a beautiful chill, soft lo-fi chord progression to emulate an gaming/anime terminal space BGM

export class AmbientSynth {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private isPlaying: boolean = false;
  private chordIndex: number = 0;
  private nextChordTime: number = 0;
  private timeoutId: any = null;

  // Immersive lo-fi soundscape chord progressions (standard anime/synthwave frequencies)
  private chords = [
    // Fmaj9: F3, A3, C4, E4, G4
    [174.61, 220.00, 261.63, 329.63, 392.00],
    // G6/11: G3, B3, D4, F#4, A4
    [196.00, 246.94, 293.66, 369.99, 440.00],
    // Em9: E3, G3, B3, D4, F#4
    [164.81, 196.00, 246.94, 293.66, 369.99],
    // Am7: A3, C4, E4, G4
    [220.00, 261.63, 329.63, 392.00]
  ];

  ensureContext() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Setup BGM volume node and routing so BGM is isolated from chimes
        this.masterVolume = this.ctx.createGain();
        this.masterVolume.gain.setValueAtTime(0.001, this.ctx.currentTime);
        
        const lpf = this.ctx.createBiquadFilter();
        lpf.type = 'lowpass';
        lpf.frequency.setValueAtTime(800, this.ctx.currentTime);
        
        this.masterVolume.connect(lpf);
        lpf.connect(this.ctx.destination);
      } catch (e) {
        console.warn("Web Audio API is not supported in this browser context:", e);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.ensureContext();
    if (!this.ctx || !this.masterVolume) return;

    this.isPlaying = true;
    this.nextChordTime = 0; // reset chord scheduler timing to play immediately
    
    // Smoothly ramp up BGM volume
    this.masterVolume.gain.setValueAtTime(this.masterVolume.gain.value, this.ctx.currentTime);
    this.masterVolume.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.0);

    if (!this.timeoutId) {
      this.scheduler();
    }
  }

  stop() {
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(this.masterVolume.gain.value, this.ctx.currentTime);
      this.masterVolume.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
    
    this.isPlaying = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  playTriggerChime() {
    this.ensureContext();
    if (!this.ctx) return;
    
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Pentatonic high bell ring
    const freq = [523.25, 587.33, 659.25, 783.99, 880.00][Math.floor(Math.random() * 5)];
    osc.frequency.setValueAtTime(freq, time);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.05, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.6);
  }

  private scheduler() {
    if (!this.isPlaying || !this.ctx || !this.masterVolume) return;

    const time = this.ctx.currentTime;
    
    // Play next chord if schedule boundary has been reached
    if (this.nextChordTime < time + 0.2) {
      const duration = 6.0; // Play chord every 6 seconds
      const chord = this.chords[this.chordIndex];
      
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        // Warm wave synthesis for organic textures
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.nextChordTime);
        
        // Slow attack and release profiles
        const noteAttack = 2.0;
        const noteRelease = 3.5;
        
        gain.gain.setValueAtTime(0, this.nextChordTime);
        gain.gain.linearRampToValueAtTime(idx === 0 ? 0.35 : 0.15, this.nextChordTime + noteAttack);
        gain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.15, this.nextChordTime + duration - noteRelease);
        gain.gain.exponentialRampToValueAtTime(0.001, this.nextChordTime + duration);
        
        osc.connect(gain);
        gain.connect(this.masterVolume!);
        
        osc.start(this.nextChordTime);
        osc.stop(this.nextChordTime + duration);
      });

      // Update schedulers for next iterations
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      this.nextChordTime = (this.nextChordTime === 0 ? time : this.nextChordTime) + duration;
    }

    // Schedule check every 250ms
    this.timeoutId = setTimeout(() => this.scheduler(), 250);
  }
}
