import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://witklipfarm.com";
  const lastModified = new Date("2026-02-07T10:36:35+00:00");

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enquiry`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
