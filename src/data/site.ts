export const siteConfig = {
  name: "Nahid Hasan",
  title: "Software Engineer",

  currentlyBuilding: "nahidbuilds.dev",

  socials: {
    github: "https://github.com/nahidhasan830",
    linkedin: "https://linkedin.com/in/nahidhasan830",
    email: "nahidhasan830@gmail.com",
  },

  resumeUrl:
    "https://drive.google.com/uc?export=download&id=1dWbYI3e4vC49nQrTX2QGjjuEZmMuui01",
} as const;

export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "folder" | "user" | "file" | "mail"; // Icon keys
  keywords?: string[]; // For command palette fuzzy search
  showInNav?: boolean; // Some items only in command palette
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "home",
    keywords: ["start", "index", "main"],
    showInNav: false, // Logo handles this in nav
  },
  {
    label: "Experience",
    href: "/#experience",
    icon: "user",
    keywords: ["work", "career", "jobs", "history", "timeline"],
  },
  {
    label: "Projects",
    href: "/#projects",
    icon: "folder",
    keywords: ["work", "portfolio", "code"],
  },
  {
    label: "Now",
    href: "/now",
    icon: "user",
    keywords: ["current", "doing", "today", "status"],
  },
];
