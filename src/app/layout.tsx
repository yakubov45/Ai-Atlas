import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PREFERENCES_INIT_SCRIPT } from "@/lib/preferences/preferences";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { uz } from "@/i18n/dictionaries/uz";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${uz.meta.siteName}`,
    default: `${uz.meta.siteName} — ${uz.meta.tagline}`,
  },
  description: uz.meta.description,
  keywords: [
    "AI Atlas",
    "Artificial Intelligence",
    "Sun'iy intellekt",
    "Machine Learning",
    "Deep Learning",
    "Transformers",
    "RAG",
    "Interactive Learning",
  ],
  authors: [{ name: "AI Atlas Platform Team" }],
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="preferences-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PREFERENCES_INIT_SCRIPT }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col selection:bg-violet-600/30 selection:text-violet-200 transition-colors`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-violet-600 text-white rounded-lg shadow-lg font-medium text-xs"
        >
          {uz.nav.skipToContent}
        </a>

        <Header />

        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
