"use client";

import {
  FileText,
  FolderKanban,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { useTheme } from "@/components/theme-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { type NavItem, navItems, siteConfig } from "@/data/site";

const iconMap = {
  home: Home,
  folder: FolderKanban,
  user: User,
  file: FileText,
  mail: Mail,
} as const;

type CommandAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  keywords?: string[];
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runAction = (action: () => void) => {
    setOpen(false);
    action();
  };

  const navigationActions: CommandAction[] = useMemo(
    () =>
      navItems.map((item: NavItem) => {
        const Icon = iconMap[item.icon];
        return {
          id: item.href,
          label: item.label,
          icon: <Icon className="size-4" />,
          action: () => router.push(item.href),
          keywords: item.keywords,
        };
      }),
    [router],
  );

  const socialActions: CommandAction[] = [
    {
      id: "github",
      label: "GitHub",
      icon: <GithubIcon className="size-4" />,
      action: () => window.open(siteConfig.socials.github, "_blank"),
      keywords: ["code", "repo", "source"],
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <LinkedinIcon className="size-4" />,
      action: () => window.open(siteConfig.socials.linkedin, "_blank"),
      keywords: ["connect", "network", "profile"],
    },
    {
      id: "email",
      label: "Send Email",
      icon: <Mail className="size-4" />,
      action: () => window.open(`mailto:${siteConfig.socials.email}`, "_blank"),
      keywords: ["contact", "message", "reach"],
    },
  ];

  const themeActions: CommandAction[] = [
    {
      id: "theme",
      label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      icon: isDark ? <Sun className="size-4" /> : <Moon className="size-4" />,
      action: toggleTheme,
      keywords: ["dark", "light", "mode", "appearance"],
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 md:flex"
      >
        <span>Search</span>
        <span className="flex items-center gap-1">
          <kbd className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
            {isMac ? "⌘" : "Ctrl"}
          </kbd>
          <kbd className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
            K
          </kbd>
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationActions.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => runAction(item.action)}
                keywords={item.keywords}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Social">
            {socialActions.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => runAction(item.action)}
                keywords={item.keywords}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Preferences">
            {themeActions.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => runAction(item.action)}
                keywords={item.keywords}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
