import { findProperties } from "@/lib/api/properties/find-properties";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { env } from "@/lib/env";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const filters = [
    {
      key: "province",
      value: "jawa barat",
    },
    {
      key: "building_type",
      value: "rumah",
    },
    {
      key: "building_type",
      value: "apartemen",
    },
    {
      key: "building_type",
      value: "tanah",
    },
    {
      key: "building_type",
      value: "gedung",
    },
    {
      key: "building_type",
      value: "ruko",
    },
    {
      key: "building_type",
      value: "ruang usaha",
    },
    {
      key: "building_type",
      value: "rumah kantor",
    },
    {
      key: "building_type",
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
  const promises = await Promise.allSettled(
    filters.map(async ({ key, value }) => {
      const response = await findProperties({
        [key]: value,
        page: String(1),
        limit: String(30),
      });
      return response;
    }),
  );

  const sitemaps = [];
  for (let i = 0; i < filters.length; i++) {
    const filterPromise = promises[i];
    if (filterPromise.status === "fulfilled") {
      if (
        filterPromise.value.data &&
        filterPromise.value?.data?.total_pages > 0
      ) {
        for (let j = 1; j <= filterPromise.value.data.total_pages; j++) {
          const filterValue = filters[i].value.replaceAll(" ", "+");
          const url =
            env.NEXT_PUBLIC_HOST_URL +
            `/properties?${filters[i].key}=${filterValue}&amp;page=${j}`;
          sitemaps.push({
            url,
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
