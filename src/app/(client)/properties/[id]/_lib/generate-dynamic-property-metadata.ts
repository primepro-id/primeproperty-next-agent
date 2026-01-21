import { findPropertyById } from "@/lib/api/properties/find-property-by-id";
import { env } from "@/lib/env";
import { Metadata } from "next";

export const generateDynamicPropertyMetadata = async (
  params: Promise<{ id: string }>,
): Promise<Metadata | undefined> => {
  const { id } = await params;

  const property = await findPropertyById(Number(id));
  if (property.data) {
    return {
      title: property.data[0].title,
      description: property.data[0].description_seo
        ? property.data[0].description_seo
        : property.data[0].description,
      keywords: property.data[0].site_path
        .replaceAll("-", " ")
        .replaceAll("/", ","),
      twitter: {
        title: property.data[0].title,
        site: "@primeproindonesia",
        creator: "@primeproindonesia",
        card: "summary_large_image",
        images: [`${env.NEXT_PUBLIC_HOST_URL}/images/primepro.png`],
      },
      openGraph: {
        title: property.data[0].title,
        description: property.data[0].description,
        siteName: "Primepro Indonesia",
        locale: "id_ID",
      },
      appleWebApp: true,
      applicationName: "Primepro Indonesia",
      alternates: {
        canonical: `${env.NEXT_PUBLIC_HOST_URL}/properties/${id}`,
      },
      robots: "index, follow",
    };
  }
  return;
};
