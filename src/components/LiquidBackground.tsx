import { useEffect, useRef } from 'react';

interface LiquidBackgroundProps {
  audioActive: boolean;
  hasEntered: boolean;
}

export default function LiquidBackground({ audioActive, hasEntered }: LiquidBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // High-performance DOM-direct Mouse tracking with hardware-accelerating translate3d
  useEffect(() => {
    let active = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      if (!active) {
        cursorRef.current.style.opacity = '1';
        active = true;
      }

      const x = e.clientX - 150; // Center the 300px glow circle
      const y = e.clientY - 150;
      
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
        active = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Synchronize muted state and play state of the video background with App audio state
  useEffect(() => {
    if (!videoRef.current) return;
    
    videoRef.current.volume = 0.5; // Cozy BGM level volume settings

    const attemptPlay = async () => {
      if (!videoRef.current) return;

      const targetMuted = !audioActive || !hasEntered;
      videoRef.current.muted = targetMuted;

      try {
        await videoRef.current.play();
      } catch (err) {
        console.warn("First video playback attempt blocked or failed (expected on load):", err);
        // Fallback: If unmuted autoplay fails, ALWAYS fall back to playing muted so the video starts playing immediately!
        if (!targetMuted) {
          try {
            videoRef.current.muted = true;
            await videoRef.current.play();
            console.log("Fallback: Video playing muted to respect browser autoplay policy.");
          } catch (fallbackErr) {
            console.error("Fallback muted playback also failed:", fallbackErr);
          }
        }
      }
    };

    attemptPlay();
  }, [audioActive, hasEntered]);

  // Listen for user interaction anywhere on the document.
  // When a user clicks, if audioActive is true and user has entered, make sure the video is unmuted and playing!
  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current && audioActive && hasEntered) {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          videoRef.current.play().catch((err) => {
            console.warn("Could not autoplay video after user interaction:", err);
          });
        }
      }
    };

    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [audioActive, hasEntered]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* High-definition AMV video background */}
      <video
        ref={videoRef}
        src="/api/video"
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Immersive Dark Glassy Gradient Shade Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[at_top_right,_color-mix(in_srgb,_var(--color-slate-950)_60%,_transparent)] opacity-60 pointer-events-none" />

      {/* Cyber Dot-Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        style={{ maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)' }}
      />
      
      {/* Tech Diagonal Lines */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(135deg,#3b82f6_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"
      />

      {/* Dynamic Floating Liquid Blobs (Liquid cyanic blue energy) using hardware-driven CSS animation */}
      <div className="absolute inset-0 overflow-hidden filter blur-[120px] opacity-40 pointer-events-none">
        {/* Blob 1 - Cyan Core */}
        <div className="absolute -top-10 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-600/20 mix-blend-screen animate-blob-1" />

        {/* Blob 2 - Sapphire Blue Deep Wave */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 mix-blend-screen animate-blob-2" />
      </div>

      {/* Mouse Tracking Interaction Aura (Liquid Light Follower) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-30 w-[300px] h-[300px] rounded-full bg-cyan-400/10 opacity-0 filter blur-[60px] mix-blend-screen cursor-aura"
        style={{ left: 0, top: 0 }}
      />

      {/* Interactive Scanline Retro Filter (Subtle cyberpunk texture overlay) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
    </div>
  );
}
