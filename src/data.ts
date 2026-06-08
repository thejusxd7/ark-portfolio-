import { Feature, Skill, Project, Contact } from './types';

export const PERSONAL_INFO = {
  title: "Ark Graphics !",
  bio: "Being blessed by God is soo hard.",
  logo: "https://i.imgur.com/LMgow69.gif",
  banner: "https://i.imgur.com/TDgmTQb.gif",
  tagline: "Digital Reality Creator & Discord Systems Architect",
  location: "Indonesia",
  quote: "Blending fluid glass layouts, anime aesthetics, and high-performance terminal systems into a unified digital artwork."
};

export const FEATURES: Feature[] = [
  {
    id: "web-dev",
    title: "Web Developer",
    description: "Crafting ultra-responsive fluid interfaces utilizing cutting-edge layouts, immersive animations, and liquid glassmorphic components.",
    iconName: "Globe",
    glowColor: "cyan",
    tag: "Next-Gen Web"
  },
  {
    id: "bot-dev",
    title: "Discord Bot Developer",
    description: "Designing reliable, high-performance discord systems with seamless interaction trees, state synchronization, and automation engines.",
    iconName: "Bot",
    glowColor: "indigo",
    tag: "System Automations"
  },
  {
    id: "server-dev",
    title: "Discord Server Developer",
    description: "Architecting beautifully customized server spaces featuring robust auto-moderation hierarchies, custom integrations, and curated thematic channels.",
    iconName: "Server",
    glowColor: "blue",
    tag: "Community Space"
  },
  {
    id: "creator-mgmt",
    title: "Creator Management",
    description: "Guiding content trajectories, optimizing workflow automation, and establishing cohesive, high-impact aesthetic identities for creators.",
    iconName: "Users",
    glowColor: "fuchsia",
    tag: "Brand Advisory"
  },
  {
    id: "creator-analysis",
    title: "Creator Analysis",
    description: "Deploying high-caliber data analysis frameworks to monitor audience dynamics, key performance metrics, and content optimization trends.",
    iconName: "TrendingUp",
    glowColor: "teal",
    tag: "Data Insights"
  },
  {
    id: "gfx-artist",
    title: "GFX Artist",
    description: "Designing premium visual graphics, high-impact banners, customized artwork, and exquisite digital branding assets.",
    iconName: "Palette",
    glowColor: "fuchsia",
    tag: "Visual Design"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description: "Compiling, timing, and color-grading high-definition cinematic AMVs, trailers, and promotional media exports.",
    iconName: "Video",
    glowColor: "cyan",
    tag: "Motion Editing"
  }
];

export const SKILLS: Skill[] = [
  {
    name: "C++",
    category: "programming",
    level: 88,
    color: "from-cyan-400 to-blue-500",
    icon: "Cpu"
  },
  {
    name: "HTML & CSS",
    category: "programming",
    level: 96,
    color: "from-teal-400 to-cyan-500",
    icon: "CodeXml"
  },
  {
    name: "Python",
    category: "programming",
    level: 90,
    color: "from-indigo-400 to-purple-500",
    icon: "Terminal"
  },
  {
    name: "JavaScript / TypeScript",
    category: "programming",
    level: 92,
    color: "from-blue-400 to-indigo-600",
    icon: "Braces"
  },
  {
    name: "React & Vite",
    category: "programming",
    level: 89,
    color: "from-cyan-500 to-blue-600",
    icon: "Atom"
  },
  {
    name: "System Architecture",
    category: "tools",
    level: 85,
    color: "from-teal-500 to-blue-600",
    icon: "Layers"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mrz-gta",
    title: "MRZ GTA WEBPAGE",
    description: "A fully immersive responsive portal created for the high-octane GTA community. Featuring a blazing-fast fluid UI, custom character displays, live status sections, and sleek cybernetic layouts that engage players upon entry.",
    url: "https://mrzofficial.vercel.app",
    tags: ["React", "Tailwind CSS", "Motion", "Vite", "Cyberpunk Style"],
    image: "https://i.imgur.com/TDgmTQb.gif", // Beautiful cyber banner as placeholder/backdrop
    glowColor: "cyan"
  }
];

export const CONTACTS: Contact[] = [
  {
    platform: "Instagram",
    username: "@arkeeyyyy",
    value: "arkeeyyyy",
    url: "https://instagram.com/arkeeyyyy",
    color: "from-fuchsia-500 via-pink-500 to-amber-500"
  },
  {
    platform: "Discord",
    username: "ID: 1364315043700674662",
    value: "arkeeyyyy",
    url: "https://discord.com/users/1364315043700674662",
    color: "from-indigo-500 to-blue-600"
  },
  {
    platform: "Whatsapp",
    username: "+62 831-1327-3901",
    value: "+6283113273901",
    url: "https://wa.me/+6283113273901",
    color: "from-emerald-400 to-teal-600"
  }
];
