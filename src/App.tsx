import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Clock, 
  Compass, 
  ArrowDownRight, 
  Crown,
  Share2,
  Check
} from 'lucide-react';

import { PERSONAL_INFO, FEATURES, SKILLS } from './data';
import LiquidBackground from './components/LiquidBackground';
import FeatureCard from './components/FeatureCard';
import SkillBar from './components/SkillBar';
import ContactSection from './components/ContactSection';
import { AmbientSynth } from './utils/audioSynth';

export default function App() {
  const [audioActive, setAudioActive] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [timeUTC, setTimeUTC] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const synthRef = useRef<AmbientSynth | null>(null);

  // Initialize synth class safely inside useRef
  if (!synthRef.current) {
    synthRef.current = new AmbientSynth();
  }

  // Update clock timers
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUTC(now.toUTCString().replace('GMT', 'UTC'));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleBackgroundAudio = () => {
    if (!synthRef.current) return;
    
    // Play the clicked chime feedback always
    synthRef.current.playTriggerChime();

    if (audioActive) {
      synthRef.current.stop();
      setAudioActive(false);
    } else {
      synthRef.current.start();
      setAudioActive(true);
    }
  };

  const handleChimePress = () => {
    if (synthRef.current) {
      synthRef.current.playTriggerChime();
    }
  };

  const handleShareProfile = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering duplicate background ambient sound at page level
    const shareText = "Ark Graphics, What to know more about me? , Just Experience.";
    const shareUrl = window.location.href;
    const shareData = {
      title: "ARK GRAPHICS",
      text: shareText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Native share cancelled or failed, falling back to copy:", err);
        copyToClipboard(shareText, shareUrl);
      }
    } else {
      copyToClipboard(shareText, shareUrl);
    }
  };

  const copyToClipboard = (text?: string, url?: string) => {
    const copyContent = text && url ? `${text}\n${url}` : (url || window.location.href);
    navigator.clipboard.writeText(copyContent);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
    if (synthRef.current) {
      synthRef.current.playTriggerChime();
    }
  };

  return (
    <div id="app-root-container" className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white" onClick={handleChimePress}>
      {/* Immersive Cyanic Liquid Gradient Background canvas */}
      <LiquidBackground audioActive={audioActive} hasEntered={hasEntered} />

      {/* Intricately designed interactive Entry Welcome Gate */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-3xl px-4 text-center cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation(); // Stop bubbling to avoid playing chime twice
              setHasEntered(true);
              if (synthRef.current) {
                synthRef.current.ensureContext();
                synthRef.current.start();
                synthRef.current.playTriggerChime();
              }
            }}
          >
            {/* Ambient background glow behind logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

            <div className="relative space-y-6 max-w-md w-full">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex justify-center"
              >
                <div className="relative group">
                  <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse" />
                  <img 
                    src={PERSONAL_INFO.logo} 
                    alt="Ark Graphics" 
                    className="relative w-24 h-24 rounded-full border-2 border-cyan-400/60 object-cover shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <div className="space-y-2">
                <motion.h1 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans uppercase"
                >
                  {PERSONAL_INFO.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase"
                >
                  Want to know more about me?
                </motion.p>
              </div>

              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6"
              >
                <button
                  type="button"
                  className="relative group overflow-hidden rounded-2xl px-10 py-4 bg-cyan-400 text-slate-950 font-black tracking-widest hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:shadow-[0_0_50px_rgba(34,211,238,0.95)] inline-flex items-center justify-center mx-auto cursor-pointer text-sm uppercase font-mono"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span>Enter Experience</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphic TOP HUD Dynamic Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900/40 bg-slate-950/25 backdrop-blur-md px-4 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute -inset-1 rounded-full bg-cyan-500/20 blur opacity-70 animate-pulse" />
              <img 
                src={PERSONAL_INFO.logo} 
                alt="Ark Logo" 
                className="relative h-8 w-8 rounded-full border border-cyan-400/40 object-cover select-none shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
                {PERSONAL_INFO.title}
                <Crown size={12} className="text-amber-500 fill-amber-500/20" />
              </span>
            </div>
          </div>

          {/* Active Navigation Sections Tracker & Stats Indicator */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-900">
              <Compass size={12} className="text-cyan-400 animate-spin-slow" />
              <span className="text-slate-300">AESTHETIC PORTFOLIO</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-cyan-500" />
              <span className="tracking-wide text-[10px] text-slate-300 select-all">{timeUTC}</span>
            </div>
          </div>

          {/* Optional Ambient Audio Interface Controls */}
          <div className="flex items-center gap-3">
            {/* Real-time responsive visualizer loops showing if playing */}
            {audioActive && (
              <div className="hidden xs:flex items-end gap-[2px] h-3.5 px-1">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: ['4px', '14px', '4px'] }}
                    transition={{ 
                      duration: 0.6 + i * 0.15, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-[2px] bg-cyan-400"
                  />
                ))}
              </div>
            )}

            <button 
              id="bgm-player-toggle"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleBackgroundAudio();
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-all duration-300 cursor-pointer ${
                audioActive 
                  ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {audioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span className="hidden sm:inline">AMBIENT SCENE SOUNDS</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Single-Screen Document Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-20 space-y-16 md:space-y-20 relative z-10">

        {/* PROFILE HERO MODULE (BANNER + INTERACTIVE GLASS PROFILE CARD) */}
        <motion.section 
          id="hero-profile" 
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative rounded-3xl overflow-hidden border border-slate-900 bg-slate-950/15 backdrop-blur-2xl p-1 md:p-1.5 shadow-[0_0_50px_rgba(3,7,18,0.5)]"
        >
          <div className="rounded-[22px] overflow-hidden bg-slate-400/2 relative">
            
            {/* Premium Immersive Banner GIF */}
            <div className="relative w-full h-44 sm:h-64 md:h-72 overflow-hidden border-b border-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <img 
                src={PERSONAL_INFO.banner} 
                alt="Ark Banner Graphics" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Glowing avatar frame and user name overlaps */}
            <div className="px-6 pb-8 pt-0 relative z-20 flex flex-col items-center text-center">
              <div className="flex flex-col items-center justify-center -mt-12 sm:-mt-16 md:-mt-20 gap-4 mb-6">
                
                {/* Overlapping circular Animated Avatar GIF */}
                <motion.div 
                  className="relative group/avatar"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <span className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-teal-400 blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={PERSONAL_INFO.logo} 
                    alt="Ark Graphics Avatar" 
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-slate-950 object-cover shadow-2xl select-none group-hover/avatar:scale-[1.01] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1.5 bg-emerald-400 w-3.5 h-3.5 rounded-full border-2 border-slate-950 animate-pulse" title="System online" />
                </motion.div>
              </div>

              {/* Title & Authentic User BIO Content */}
              <div className="max-w-2xl mx-auto space-y-4 flex flex-col items-center">
                
                <div className="space-y-1.5 flex flex-col items-center">
                  <h1 className="text-4xl sm:text-5.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 tracking-tight leading-none drop-shadow-sm flex items-center justify-center gap-2">
                    {PERSONAL_INFO.title}
                  </h1>
                </div>

                {/* USER BIO MANDATE - EXACT QUOTE FROM USER REQUESTS */}
                <blockquote className="border-l-2 border-cyan-500/60 pl-4 py-1 italic text-slate-200 text-lg sm:text-xl font-medium font-sans">
                  "{PERSONAL_INFO.bio}"
                </blockquote>

              </div>

            </div>

          </div>
        </motion.section>

        {/* SECTION WHAT I CAN DO? */}
        <section id="features-services" className="space-y-8">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto border-b border-slate-900 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              WHAT I CAN DO?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, idx) => (
              <FeatureCard key={feat.id} feature={feat} index={idx} />
            ))}
          </div>
        </section>

        {/* SECTION PROGRAMMING SKILLS (Like C++, HTML, Python, etc.) */}
        <section id="programming-skills" className="space-y-8">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto border-b border-slate-900 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Programming Skills
            </h2>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">
              C++, Html , Python , etc
            </span>
          </div>

          {/* Grid layout of interactive animated Skill Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* SECTION CONTACT ME (Instagram, Discord, Whatsapp) */}
        <section id="contact-gate" className="space-y-8">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto border-b border-slate-900 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact Me
            </h2>
          </div>

          <ContactSection />

          {/* High-fidelity interactive glass Share Profile button with glowing animation */}
          <div className="flex justify-center pt-4 relative z-10">
            <motion.button
              id="share-profile-btn"
              type="button"
              onClick={handleShareProfile}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl px-8 py-4 bg-slate-950/50 border border-cyan-500/20 text-cyan-300 font-semibold tracking-wide hover:border-cyan-400/40 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] flex items-center gap-3 backdrop-blur-xl cursor-pointer"
            >
              {/* Outer light sheen sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <AnimatePresence mode="wait">
                {shareCopied ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-400 font-mono text-sm uppercase tracking-widest"
                  >
                    <Check size={18} />
                    Link Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="share"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-2 text-sm uppercase font-mono tracking-widest"
                  >
                    <Share2 size={18} className="animate-pulse" />
                    Share Profile
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </section>

      </main>

      {/* COPYRIGHT FOOTER SECTION */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/60 backdrop-blur-md py-10 px-4 mt-20 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          
          {/* USER SPECIFIED COPYRIGHT STRING MANDATE */}
          <div className="text-slate-400 font-semibold tracking-wide text-center md:text-left hover:text-cyan-400 transition-colors duration-300 w-full text-center">
            ARK GRAPHICS © 2026 | ALL RIGHTS RESERVED
          </div>

        </div>
      </footer>
    </div>
  );
}
