import { env } from "@/lib/env";
import { Metadata } from "next";
import { parseFilterParams } from "./parse-filter-params";
import {
  generateDescription,
  generateKeyword,
  generateTitle,
} from "./create-properties-metadata";

export const generatePropertiesFilterMetadata = async (
  params: Promise<{ params: string[] }>,
): Promise<Metadata> => {
  const pageParams = await params;
  const searchParams = parseFilterParams(pageParams.params);

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
      canonical: `${env.NEXT_PUBLIC_HOST_URL}/properties/filter/${pageParams.params.join("/")}`,
    },
    robots: "index, follow",
  };
};
