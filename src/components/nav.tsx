"use client";

import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/components/active-section-context";
import { useContactDialog } from "@/components/contact-dialog-context";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const visibleNavItems = navItems.filter((item) => item.showInNav !== false);

function useIsActive() {
  const pathname = usePathname();
  const { activeSection } = useActiveSection();

  return (href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const hrefPath = href.slice(0, hashIndex) || "/";
      const hrefHash = href.slice(hashIndex + 1);
      return pathname === hrefPath && activeSection === hrefHash;
    }
    return pathname === href;
  };
}

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { openContactDialog } = useContactDialog();
  const isActive = useIsActive();

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run on pathname change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <nav className="container h-full flex items-center justify-between px-6 md:px-12 lg:px-24">
          <Link
            href="/"
            className="group flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary font-bold text-lg transition-all duration-150 hover:bg-primary hover:text-primary-foreground"
            aria-label="Home"
          >
            N
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {visibleNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-150 hover:text-primary",
                      "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-150 hover:after:w-full",
                      isActive(item.href) && "text-primary after:w-full",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={
                resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="size-9"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={
                resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Header row matching nav layout */}
        <div className="relative h-16 flex items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary font-bold text-lg"
            aria-label="Home"
            onClick={() => setIsOpen(false)}
          >
            N
          </Link>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={
                resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </Button>
          </div>
        </div>

        {/* Centered navigation links */}
        <nav className="relative flex-1 flex items-center justify-center">
          <ul className="flex flex-col items-center gap-6">
            {visibleNavItems.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  "transition-all duration-300",
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative block px-6 py-2 text-2xl font-medium transition-colors duration-150 hover:text-primary",
                    isActive(item.href) && "text-primary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links at bottom */}
        <div
          className={cn(
            "relative pb-12 flex justify-center gap-2 transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen
              ? `${visibleNavItems.length * 50 + 50}ms`
              : "0ms",
          }}
        >
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsOpen(false);
              openContactDialog();
            }}
            aria-label="Email"
          >
            <Mail className="size-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
