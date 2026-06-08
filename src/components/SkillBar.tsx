import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
  key?: string | number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  // Map string icon names to Lucide icons
  const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Cpu;

  return (
    <motion.div
      id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="p-5 rounded-xl border border-slate-900/60 bg-slate-900/15 backdrop-blur-md hover:border-cyan-500/20 hover:bg-slate-900/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/35 border border-cyan-800/15 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
            <IconComponent size={16} strokeWidth={2} />
          </div>
          <span className="text-sm font-medium tracking-tight text-slate-200 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
          {skill.level}%
        </span>
      </div>

      {/* Cyber Glass Progress Track */}
      <div className="h-2 w-full rounded-full bg-slate-950/80 border border-slate-900 overflow-hidden relative p-[1px]">
        {/* Animated Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
        >
          {/* Glowing pulse at the end of progress */}
          <div className="absolute right-0 top-0 h-full w-2.5 bg-white rounded-full filter blur-[2px] opacity-80 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}
