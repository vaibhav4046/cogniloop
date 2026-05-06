import type { MetadataRoute } from "next";

const SITE = "https://cogniloop-vaibhav4046s-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/seed-", "/shared/", "/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
