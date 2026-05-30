import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastHost } from "@/components/Toast";
import { ShortcutsLoader } from "@/components/ShortcutsLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cogniloop-vaibhav4046s-projects.vercel.app"),
  title: "Cogniloop — The AI tutor that refuses to give you the answer",
  description:
    "Active-recall AI tutor. Feynman technique. Concept tracker. Streaks. Curriculum templates for JEE, NEET, GATE, MCAT. Free, no signup, no API keys. 100% client-side.",
  keywords: [
    "active recall",
    "Feynman technique",
    "AI tutor",
    "study app",
    "Socratic learning",
    "JEE prep",
    "NEET prep",
    "GATE CSE",
    "MCAT",
    "spaced repetition",
    "free LLM",
    "Pollinations",
    "Groq",
  ],
  authors: [{ name: "Vaibhav Lalwani" }],
  openGraph: {
    title: "Cogniloop — Active recall, AI-powered",
    description:
      "An AI tutor that won't summarize for you. Paste a topic, get drilled with Socratic questions, and actually learn.",
    type: "website",
    siteName: "Cogniloop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniloop",
    description:
      "Active-recall AI tutor. Free, no signup, no API keys. Built for students who want to actually learn.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <a href="#main" className="skip-link">Skip to content</a>
        <ToastHost>
          {children}
          <ShortcutsLoader />
        </ToastHost>
      </body>
    </html>
  );
}
