import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cogniloop — Active recall AI tutor",
    short_name: "Cogniloop",
    description:
      "The AI tutor that refuses to give you the answer. Active-recall, Feynman-style drilling. Free, no signup.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#a78bfa",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["education", "productivity"],
  };
}
