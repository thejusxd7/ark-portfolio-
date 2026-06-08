import { motion } from 'motion/react';
import { ExternalLink, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, scale: 0.96, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl border border-slate-850 bg-slate-950/40 p-1 md:p-2 backdrop-blur-2xl group shadow-2xl overflow-hidden"
    >
      {/* Liquid Cyan Aura Backdrop */}
      <div className="absolute -inset-10 bg-radial-[at_top_right,_color-mix(in_srgb,_var(--color-cyan-500)_15%,_transparent)] opacity-60 filter blur-3xl pointer-events-none group-hover:opacity-80 transition-all duration-700" />

      {/* Retro-Futuristic Terminal / Browser Container */}
      <div className="rounded-[22px] border border-slate-900 bg-slate-955/80 backdrop-blur-3xl overflow-hidden">
        
        {/* Mock Browser Header */}
        <div className="px-5 py-3 border-b border-slate-900 bg-slate-900/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-600 transition-colors cursor-pointer" />
          </div>
          
          {/* Mock URL Bar (Liquid Glass Aesthetic) */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.2 rounded-lg bg-slate-950/80 border border-slate-900 text-xs text-slate-400 font-mono w-72 md:w-96 select-all transition-all group-hover:border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] justify-center">
            <span className="text-[10px] text-cyan-500/70">https://</span>
            <span className="text-slate-300 truncate">{project.url.replace('https://', '')}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-widest bg-cyan-950/30 px-2 py-0.5 rounded-md border border-cyan-500/20">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-0.5" />
            LIVE VIEW
          </div>
        </div>

        {/* Browser Page Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
          
          {/* Visual Showcase Block (Left: 7cols) */}
          <div className="lg:col-span-7 relative group/preview rounded-xl overflow-hidden border border-slate-900/80 bg-slate-900/40 aspect-video lg:aspect-auto lg:h-[350px]">
            {/* Glowing filter background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />

            {/* Simulated website frame with active glowing cover background image */}
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-105 group-hover:opacity-85 select-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing tech stats overlays */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-semibold shadow-lg backdrop-blur-md">
                <Flame size={10} className="text-amber-500 animate-pulse" />
                OFFICIAL SYSTEM
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-400 shadow-md backdrop-blur-md">
                GTA COMMUNITY
              </span>
            </div>

            {/* Visual Hover Play Wireframe */}
            <div className="absolute inset-0 flex items-center justify-center z-15 group-hover/preview:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-cyan-950/30 backdrop-blur-[1px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500" />
              <motion.a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
              >
                <ExternalLink size={24} strokeWidth={2.5} />
              </motion.a>
            </div>
            
            {/* Corner Decorative Tech Lines */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-slate-400/80">
              [COORD_SYS :: R-99]
            </div>
          </div>

          {/* Description & Metadata Block (Right: 5cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles size={16} />
                <span className="text-xs font-mono font-medium tracking-wider uppercase">PRIMARY PRODUCTION</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                {project.title}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Technologies Tag Bento */}
              <div className="pt-2">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2.5">BUILT WITH</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 text-xs font-mono bg-slate-950/60 border border-slate-900 hover:border-cyan-500/20 transition-colors text-slate-400 rounded-lg hover:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Anchor Module */}
            <div className="pt-4 border-t border-slate-900">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 font-semibold text-slate-950 text-sm tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 group-hover:scale-[1.01]"
              >
                Launch Live Server
                <ExternalLink size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
              <span className="block text-center mt-2 text-[10px] text-slate-500 font-mono">
                Opens secure portal at {project.url.replace('https://', '')}
              </span>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
