import { findPropertiesSitePaths } from "@/lib/api/properties/find-properties-site-paths";
import { env } from "@/lib/env";
import { MetadataRoute } from "next";
import { parseFilterParams } from "../_lib/parse-filter-params";

const generatePropertySitePathSitemaps = async () => {
  const properties = await findPropertiesSitePaths();
  const sitemaps = [];
  const baseUrl = env.NEXT_PUBLIC_HOST_URL + `/properties`;
  if (Array.isArray(properties?.data)) {
    for (const path of properties?.data) {
      sitemaps.push({
        url: baseUrl + `/filter${path}`,
        lastModified: new Date(),
      });

      const pathArray = path.split("/");
      pathArray.shift();
      const filterParams = parseFilterParams(pathArray);
      const urlParam = new URLSearchParams(filterParams);
      for (let i = 1; i <= 10; i++) {
        urlParam.set("page", String(i));
        sitemaps.push({
          url: baseUrl + "?" + urlParam.toString().replaceAll("&", "&amp;"),
          lastModified: new Date(),
        });
      }
    }
    return sitemaps;
  }

  return [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const sitePathsSitemaps = await generatePropertySitePathSitemaps();

  return sitePathsSitemaps;
}
