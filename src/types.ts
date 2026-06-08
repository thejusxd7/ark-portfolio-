export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Refers to Lucide icon names
  glowColor: string; // Cyan, blue, sapphire, etc.
  tag: string;
}

export interface Skill {
  name: string;
  category: 'programming' | 'design' | 'tools';
  level: number; // 0 to 100
  color: string; // Tailwind cyan/blue class
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string; // Banner or graphic placeholder
  glowColor: string;
}

export interface Contact {
  platform: 'Instagram' | 'Discord' | 'Whatsapp';
  value: string;
  url: string;
  color: string;
  username: string;
}
