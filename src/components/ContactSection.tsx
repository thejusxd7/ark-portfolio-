import { motion } from 'motion/react';
import { Instagram, MessagesSquare, Phone, ExternalLink } from 'lucide-react';
import { CONTACTS } from '../data';

export default function ContactSection() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram size={28} className="relative z-10 text-white" />;
      case 'Discord':
        return <MessagesSquare size={28} className="relative z-10 text-white" />;
      case 'Whatsapp':
        return <Phone size={28} className="relative z-10 text-white" />;
      default:
        return <ExternalLink size={28} className="relative z-10 text-white" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {CONTACTS.map((contact, idx) => {
        return (
          <motion.a
            key={contact.platform}
            href={contact.url}
            target="_blank"
            rel="noreferrer"
            id={`contact-card-${contact.platform.toLowerCase()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-850 bg-slate-950/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 flex flex-col items-center text-center cursor-pointer shadow-lg"
          >
            {/* Animated Social Glow Background */}
            <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-gradient-to-tr ${contact.color} opacity-[0.03] filter blur-xl group-hover:opacity-[0.12] transition-opacity duration-300`} />

            {/* Accent Border Frame */}
            <div className={`absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r ${contact.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Platform Branding Emblem */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${contact.color} text-white shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 mb-4`}>
              {getSocialIcon(contact.platform)}
            </div>

            {/* Platform Name Title text */}
            <h4 className="text-xl font-bold text-slate-200 group-hover:text-cyan-300 tracking-wide transition-colors">
              {contact.platform}
            </h4>

            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 mt-2 tracking-widest uppercase">
              CLICK TO VISIT
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
