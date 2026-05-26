import { findPropertyById } from "@/lib/api/properties/find-property-by-id";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { env } from "@/lib/env";
import { Metadata } from "next";

export const generateDynamicPropertyMetadata = async (
  params: Promise<{ id: string }>,
): Promise<Metadata | undefined> => {
  const { id } = await params;
  const [propertyId] = id.split("-");

  const property = await findPropertyById(Number(propertyId));
  if (property.data) {
    const purchaseStatus =
      property.data[0].purchase_status === PurchaseStatus.ForRent
        ? "disewa"
        : "dijual";
    const description =
      property.data[0].building_type +
      " " +
      purchaseStatus +
      " " +
      `di ${property.data[0].street}, ${property.data[0].regency}. ` +
      `Properti dipasang oleh ${property.data[1].fullname}. Property ${id}.`;
    return {
      title: property.data[0].title + `. Property ${id} - PRIMEPRO INDONESIA`,
      description,
      keywords:
        property.data[0].site_path.replaceAll("-", " ").replaceAll("/", ",") +
        "|" +
        property.data[0].title,
      twitter: {
        title: property.data[0].title,
        site: "@primeproindonesia",
        creator: "@primeproindonesia",
        card: "summary_large_image",
        images: [`${env.NEXT_PUBLIC_HOST_URL}/images/primepro.png`],
      },
      openGraph: {
        title: property.data[0].title,
        description,
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
