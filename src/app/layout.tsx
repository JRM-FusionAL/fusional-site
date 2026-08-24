import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://fusional.dev"),
  title: "FusionAL — Governed AI for Regulated Industries",
  description:
    "Keep it Flowing while Always Knowing. MCP governance gateways, FusionAL Canvas architecture planning, and done-for-you AI operating systems.",
  openGraph: {
    title: "FusionAL — Governed AI for Regulated Industries",
    description:
      "MCP governance gateways, FusionAL Canvas architecture planning, and done-for-you AI operating systems.",
    url: "https://fusional.dev",
    siteName: "FusionAL",
    images: [{ url: "/assets/og-card.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FusionAL — Governed AI for Regulated Industries",
    description:
      "MCP governance gateways, FusionAL Canvas planning, and done-for-you AI operating systems.",
    images: ["/assets/og-card.jpg"],
  },
};

const nav = [
  { href: "/fusional-canvas", label: "FusionAL Canvas" },
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
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/fusional-mark.svg"
                alt=""
                className="h-6 w-6"
              />
              Fusion<span className="text-molten">AL</span>
            </Link>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-paper/80 sm:gap-x-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="mailto:jrm@fusional.dev"
                className="whitespace-nowrap rounded-full border border-gold px-3 py-1 text-gold transition-colors hover:bg-gold hover:text-ink sm:px-4 sm:py-1.5"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-paper/50">
            <div>
              <p>© 2026 JRM FusionAL</p>
              <p className="mt-0.5 text-xs italic text-paper/30">Keep it Flowing while Always Knowing.</p>
            </div>
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
        <SpeedInsights />
      </body>
    </html>
  );
}
