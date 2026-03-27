import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ActiveSectionProvider } from "@/components/active-section-context";
import { CommandPalette } from "@/components/command-palette";
import { ConsoleMessage } from "@/components/console-message";
import { ContactDialogProvider } from "@/components/contact-dialog-context";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nahid Hasan | Software Engineer",
  description: "Software Engineer portfolio",
};

const themeScript = `
  (function() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ActiveSectionProvider>
            <ContactDialogProvider>
              <ConsoleMessage />
              <CommandPalette />
              <Toaster position="bottom-right" richColors />
              <Nav />
              <div className="flex-1">{children}</div>
              <Footer />
            </ContactDialogProvider>
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
