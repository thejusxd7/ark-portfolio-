import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
  key?: string | number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  // Dynamically resolve lucide components based on stored string names
  const IconComponent = (LucideIcons as any)[feature.iconName] || LucideIcons.HelpCircle;

  // Setup color theme specific variations
  const glowShadows: Record<string, string> = {
    cyan: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/30",
    indigo: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] group-hover:border-indigo-500/30",
    blue: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:border-blue-500/30",
    fuchsia: "group-hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] group-hover:border-fuchsia-500/30",
    teal: "group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:border-teal-500/30"
  };

  const glowTexts: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-950/40 border-cyan-500/20 group-hover:text-cyan-300",
    indigo: "text-indigo-400 bg-indigo-950/40 border-indigo-500/20 group-hover:text-indigo-300",
    blue: "text-blue-400 bg-blue-950/40 border-blue-500/20 group-hover:text-blue-300",
    fuchsia: "text-fuchsia-400 bg-fuchsia-950/40 border-fuchsia-500/20 group-hover:text-fuchsia-300",
    teal: "text-teal-400 bg-teal-950/40 border-teal-500/20 group-hover:text-teal-300"
  };

  const currentGlow = glowShadows[feature.glowColor] || glowShadows.cyan;
  const currentText = glowTexts[feature.glowColor] || glowTexts.cyan;

  return (
    <motion.div
      id={`feature-card-${feature.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/25 p-6 backdrop-blur-xl transition-all duration-500 ${currentGlow}`}
    >
      {/* Liquid Sheen glass reflection flow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/0 to-cyan-500/[0.02] group-hover:to-cyan-400/[0.05] transition-all duration-500" />
      
      {/* Ambient Radial glow behind icon */}
      <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-400/10 transition-all duration-500" />

      {/* Header Accent */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
          {feature.tag}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 transition-colors duration-500" />
      </div>

      {/* Action/Icon Container */}
      <div className="relative z-10 flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-xl border transition-all duration-300 ${currentText}`}>
          <IconComponent size={22} strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-medium text-slate-200 tracking-tight transition-colors group-hover:text-white">
          {feature.title}
        </h3>
      </div>

      {/* Descriptive content */}
      <p className="relative z-10 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
        {feature.description}
      </p>

      {/* Cyber Corner Grid Trim (Subtle technical borders matching liquid glass aesthetic) */}
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-slate-800 group-hover:border-cyan-500/30 transition-colors duration-500" />
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-slate-800 group-hover:border-cyan-500/30 transition-colors duration-500" />
    </motion.div>
  );
}
