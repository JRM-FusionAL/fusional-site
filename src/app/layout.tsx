import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FusionAL — Governed AI for Regulated Industries",
  description:
    "MCP governance gateways, Ghost AI architecture planning, and done-for-you AI operating systems. Built by JRM FusionAL.",
};

const nav = [
  { href: "/ghost-ai", label: "Ghost AI" },
  { href: "/aios", label: "AIOS" },
  { href: "/tools", label: "Open Source" },
  { href: "/writing", label: "Writing" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight"
            >
              Fusion<span className="text-molten">AL</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-paper/80">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="mailto:jonathanmelton.fusional@gmail.com"
                className="rounded-full border border-gold px-4 py-1.5 text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-paper/50">
            <p>© 2026 JRM FusionAL</p>
            <div className="flex gap-6">
              <a
                href="https://github.com/JRM-FusionAL"
                className="hover:text-gold"
              >
                GitHub
              </a>
              <a href="https://fusional.dev" className="hover:text-gold">
                fusional.dev
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
