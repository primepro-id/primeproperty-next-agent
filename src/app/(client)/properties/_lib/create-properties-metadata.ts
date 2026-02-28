import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { PURCHASE_STATUS, PurchaseStatus } from "@/lib/enums/purchase-status";
import { env } from "@/lib/env";
import { Metadata } from "next";
import { toTitleCase } from "@/lib/to-title-case";

export const generateTitle = (searchParams: FindPropertyQuery) => {
  const propertyType = searchParams.buiding_type
    ? searchParams.buiding_type
    : "Properti";
  const purchaseType = searchParams.purchase_status
    ? PURCHASE_STATUS[
        searchParams.purchase_status as PurchaseStatus
      ].toLowerCase()
    : "dijual";
  let location = "";
  if (searchParams.street) {
    location += " ";
    location += searchParams.street.replaceAll("-", " ");
  }
  if (searchParams.regency) {
    location += " ";
    location += searchParams.regency.replaceAll("-", " ");
  }
  if (!searchParams.regency && searchParams.province) {
    location += " ";
    location += searchParams.province.replaceAll("-", " ");
  }

  const fullLocation = `${propertyType} ${purchaseType} di ${location ? location : "Indonesia"}`;
  const date = new Date();

  return `${toTitleCase(fullLocation)} | Harga Terbaru ${date.getFullYear()}`;
};

export const generateDescription = (searchParams: FindPropertyQuery) => {
  const propertyType = searchParams.buiding_type
    ? searchParams.buiding_type
    : "Properti";
  const purchaseType = searchParams.purchase_status
    ? PURCHASE_STATUS[
        searchParams.purchase_status as PurchaseStatus
      ].toLowerCase()
    : "dijual";
  let location = "";
  if (searchParams.street) {
    location += " jalan ";
    location += searchParams.street.replaceAll("-", " ");
  }
  if (searchParams.regency) {
    location += " ";
    location += searchParams.regency.replaceAll("-", " ");
  }
  if (!searchParams.regency && searchParams.province) {
    location += " ";
    location += searchParams.province.replaceAll("-", " ");
  }

  const fullLocation = `${propertyType} ${purchaseType} Murah di ${location ? location : "Indonesia"}`;
  return (
    toTitleCase(fullLocation) +
    "Lihat properti dan rumahan dijual di Indonesia terlengkap dan terdekat. ✓ Harga Murah ✓ Bisa KPR ✓ Lokasi Strategis ✓ Pencarian Mudah ."
  );
};

export const generateKeyword = (searchParams: FindPropertyQuery) => {
  const propertyType = searchParams.buiding_type
    ? searchParams.buiding_type
    : "Properti";
  const purchaseType = searchParams.purchase_status
    ? PURCHASE_STATUS[
        searchParams.purchase_status as PurchaseStatus
      ].toLowerCase()
    : "dijual";

  let location = "";
  if (searchParams.street) {
    location += searchParams.street.replaceAll("-", " ");
    location += ",";
  }
  if (searchParams.regency) {
    location += searchParams.regency.replaceAll("-", " ");
    location += ",";
  }
  if (searchParams.province) {
    location += searchParams.province.replaceAll("-", " ");
    location += ",";
  }

  return `${propertyType}, ${purchaseType}, ${location ?? "Indonesia"}, Primepro Indonesia`;
};

export const generateCanonical = (searchParams: FindPropertyQuery) => {
  if (Object.values(searchParams).length > 0) {
    const searchParamsStr = new URLSearchParams(searchParams);
    return `?${searchParamsStr.toString()}`;
  }

  return "";
};

export const generatePropertiesMetadata = async (
  searchQuery: Promise<FindPropertyQuery>,
): Promise<Metadata> => {
  const searchParams = await searchQuery;

  return {
    title: generateTitle(searchParams),
    description: generateDescription(searchParams),
    keywords: generateKeyword(searchParams),
    twitter: {
      title: generateTitle(searchParams),
      site: "@primeproindonesia",
      creator: "@primeproindonesia",
      card: "summary_large_image",
      images: [`${env.NEXT_PUBLIC_HOST_URL}/images/primepro.png`],
    },
    openGraph: {
      title: generateTitle(searchParams),
      description: generateDescription(searchParams),
      siteName: "Primepro Indonesia",
      locale: "id_ID",
    },
    appleWebApp: true,
    applicationName: "Primepro Indonesia",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_HOST_URL}/properties${generateCanonical(searchParams)}`,
    },
    robots: "index, follow",
  };
};
