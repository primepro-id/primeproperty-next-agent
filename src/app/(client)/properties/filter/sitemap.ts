import { findProperties } from "@/lib/api/properties/find-properties";
import { findPropertiesSitePaths } from "@/lib/api/properties/find-properties-site-paths";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
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

const cleanUrl = (url: string) =>
  String(url).replaceAll("&", "&amp;").replaceAll(" ", "+");

async function generatePropertyFiltersSitemaps() {
  // Google's limit is 50,000 URLs per sitemap
  const filters = [
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "province",
      secondValue: "jakarta",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "regency",
      secondValue: "jakarta selatan",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "regency",
      secondValue: "jakarta pusat",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "street",
      secondValue: "kuningan",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "street",
      secondValue: "kemang",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "street",
      secondValue: "kebayoran baru",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "street",
      secondValue: "pondok indah",
    },
    {
      key: "buiding_type",
      value: "rumah",
      secondKey: "street",
      secondValue: "lebak bulus",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "regency",
      secondValue: "jakarta selatan",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "regency",
      secondValue: "jakarta pusat",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "street",
      secondValue: "kuningan",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "street",
      secondValue: "lebak bulus",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "street",
      secondValue: "kemang",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "street",
      secondValue: "pondok indah",
    },
    {
      key: "buiding_type",
      value: "apartemen",
      secondKey: "street",
      secondValue: "kebayoran baru",
    },
    {
      key: "province",
      value: "jawa barat",
    },
    {
      key: "buiding_type",
      value: "rumah",
    },
    {
      key: "buiding_type",
      value: "apartemen",
    },
    {
      key: "buiding_type",
      value: "tanah",
    },
    {
      key: "buiding_type",
      value: "gedung",
    },
    {
      key: "buiding_type",
      value: "ruko",
    },
    {
      key: "buiding_type",
      value: "ruang usaha",
    },
    {
      key: "buiding_type",
      value: "rumah kantor",
    },
    {
      key: "buiding_type",
      value: "space kantor",
    },
    {
      key: "street",
      value: "kuningan",
    },
    {
      key: "street",
      value: "kemang",
    },
    {
      key: "street",
      value: "pondok indah",
    },
    {
      key: "street",
      value: "kebayoran baru",
    },
    {
      key: "regency",
      value: "jakarta pusat",
    },
    {
      key: "regency",
      value: "jakarta selatan",
    },
    {
      key: "province",
      value: "jakarta",
    },
    {
      key: "purchase_status",
      value: PurchaseStatus.ForSale,
    },
    {
      key: "purchase_status",
      value: PurchaseStatus.ForRent,
    },
  ];
  const promises = await Promise.allSettled([
    ...filters.map(async ({ key, value }) => {
      const response = await findProperties({
        [key]: value,
        page: String(1),
        limit: String(30),
      });
      return response;
    }),
  ]);

  const sitemaps = [];
  for (let i = 0; i < filters.length; i++) {
    const filterPromise = promises[i];
    if (filterPromise.status === "fulfilled") {
      if (
        filterPromise.value.data &&
        filterPromise.value?.data?.total_pages > 0
      ) {
        for (let j = 1; j <= filterPromise.value.data.total_pages; j++) {
          const url = new URL(env.NEXT_PUBLIC_HOST_URL + `/properties`);
          const filterValue = filters[i].value;
          url.searchParams.set(filters[i].key, filterValue);

          if (filters[i].secondKey && filters[i].secondValue) {
            const secondFilterValue = String(filters[i].secondValue);
            url.searchParams.set(
              String(filters[i]?.secondKey),
              secondFilterValue,
            );
          }

          url.searchParams.set("page", String(j));
          sitemaps.push({
            url: cleanUrl(url.toString()),
            lastModified: new Date(),
          });
        }
      }
    }
  }

  if (sitemaps.length > 0) {
    return sitemaps;
  }

  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const sitePathsSitemaps = await generatePropertySitePathSitemaps();
  const filterSitemaps = await generatePropertyFiltersSitemaps();

  return [...sitePathsSitemaps, ...filterSitemaps];
}
