import type { MetadataRoute } from "next";

const SITE = "https://cogniloop-vaibhav4046s-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/templates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/why`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/history`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];
}
