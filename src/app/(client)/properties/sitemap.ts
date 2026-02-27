import { findProperties } from "@/lib/api/properties/find-properties";
import { findPropertiesSitePaths } from "@/lib/api/properties/find-properties-site-paths";
import { env } from "@/lib/env";
import { MetadataRoute } from "next";

const generateDynamicPropertySitemaps = async () => {
  const properties = await findProperties();
  if (Array.isArray(properties?.data?.data)) {
    return properties.data?.data.map((property) => {
      return {
        url: env.NEXT_PUBLIC_HOST_URL + `/properties/${property[0].id}`,
        lastModified: new Date(property[0].updated_at),
      };
    }) as MetadataRoute.Sitemap;
  }

  return [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const dynamicPropertySitemaps = await generateDynamicPropertySitemaps();

  return [
    {
      url: env.NEXT_PUBLIC_HOST_URL + `/properties`,
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_HOST_URL + `/properties/filter/sitemap.xml`,
      lastModified: new Date(),
    },
    ...dynamicPropertySitemaps,
  ];
}
