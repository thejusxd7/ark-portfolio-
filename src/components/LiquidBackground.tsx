import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface LiquidBackgroundProps {
  audioActive: boolean;
}

export default function LiquidBackground({ audioActive }: LiquidBackgroundProps) {
  const [mouseActive, setMouseActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // High-fidelity spring animations for smooth organic tracking of custom cursor aura
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150); // Offset to center the 300px glow circle
      mouseY.set(e.clientY - 150);
      if (!mouseActive) setMouseActive(true);
    };

    const handleMouseLeave = () => {
      setMouseActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, mouseActive]);

  // Synchronize muted state of the video background with App audio state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !audioActive;
      videoRef.current.volume = 0.5; // Cozy BGM level volume settings

      if (audioActive) {
        videoRef.current.play().catch((err) => {
          console.warn("Video sound playback requires initial user interaction:", err);
        });
      }
    }
  }, [audioActive]);

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

      {/* Dynamic Floating Liquid Blobs (Liquid cyanic blue energy) */}
      <div className="absolute inset-0 overflow-hidden filter blur-[120px] opacity-40 pointer-events-none">
        {/* Blob 1 - Cyan Core */}
        <motion.div
          animate={{
            x: [100, 300, -50, 100],
            y: [-50, 150, 200, -50],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-600/20 mix-blend-screen"
        />

        {/* Blob 2 - Sapphire Blue Deep Wave */}
        <motion.div
          animate={{
            x: [200, -100, 150, 200],
            y: [300, 50, -100, 300],
            scale: [1.2, 0.8, 1.1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 mix-blend-screen"
        />
      </div>

      {/* Mouse Tracking Interaction Aura (Liquid Light Follower) */}
      {mouseActive && (
        <motion.div
          className="pointer-events-none fixed z-30 w-[300px] h-[300px] rounded-full bg-cyan-400/10 opacity-50 filter blur-[60px] mix-blend-screen"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        />
      )}

      {/* Interactive Scanline Retro Filter (Subtle cyberpunk texture overlay) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
    </div>
  );
}
