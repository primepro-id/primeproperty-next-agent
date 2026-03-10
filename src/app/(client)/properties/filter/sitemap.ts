import { findProperties } from "@/lib/api/properties/find-properties";
import { findPropertiesSitePaths } from "@/lib/api/properties/find-properties-site-paths";
import { env } from "@/lib/env";
import { MetadataRoute } from "next";

const generatePropertySitePathSitemaps = async () => {
  const properties = await findPropertiesSitePaths();
  if (Array.isArray(properties?.data)) {
    return properties.data?.map((path) => {
      return {
        url: env.NEXT_PUBLIC_HOST_URL + `/properties/filter${path}`,
        lastModified: new Date(),
      };
    }) as MetadataRoute.Sitemap;
  }

  return [];
};

async function generatePropertyFiltersSitemaps() {
  // Google's limit is 50,000 URLs per sitemap

  const basePropertySitemap = await findProperties({
    page: String(1),
    limit: String(30),
  });

  const sitemaps = [];

  if (Array.isArray(basePropertySitemap?.data?.data)) {
    for (let i = 0; i < basePropertySitemap.data.total_pages; i++) {
      sitemaps.push({
        url: env.NEXT_PUBLIC_HOST_URL + `/properties?page=${i + 1}`,
        date: new Date(),
      });
    }
  }

  if (sitemaps.length > 0) {
    return sitemaps;
  }

  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const filterSitemaps = await generatePropertyFiltersSitemaps();
  const sitePathsSitemaps = await generatePropertySitePathSitemaps();

  return [...filterSitemaps, ...sitePathsSitemaps];
}
