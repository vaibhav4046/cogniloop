import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cogniloop — Active recall, AI-powered",
  description:
    "Cogniloop refuses to give answers. It quizzes you with the Feynman technique, finds your blind spots, and rebuilds your understanding round by round. Free. No signup.",
  keywords: [
    "active recall",
    "Feynman technique",
    "AI tutor",
    "study app",
    "Socratic learning",
    "free LLM study tool",
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
      "Active-recall AI tutor. Free, no signup, no API keys. Built for students who want to actually learn, not summarize.",
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
        {children}
      </body>
    </html>
  );
}
