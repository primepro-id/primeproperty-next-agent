import { Property } from "@/lib/api/properties/type";
import { env } from "@/lib/env";
import { toTitleCase } from "@/lib/to-title-case";

export const createDynamicPropertySchema = (property: Property) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    accommodationCategory: toTitleCase(property.building_type),
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: `${property.street}, ${property.regency}`.replaceAll(
        "-",
        " ",
      ),
      addressRegion: property.province.replaceAll("-", " "),
      streetAddress: property.site_path
        .replaceAll("/", ", ")
        .replaceAll("-", " "),
    },
    brand: {
      "@type": "Brand",
      logo: [`${env.NEXT_PUBLIC_HOST_URL}/images/primepro.png`],
      name: "Primepro Indonesia",
      url: env.NEXT_PUBLIC_HOST_URL,
    },
    description: property.description,
    image: property.images.map(
      (image) => `${env.NEXT_PUBLIC_S3_ENDPOINT}${image.path}`,
    ),
    name: property.title,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: property.price,
      priceCurrency: "IDR",
      url: `${env.NEXT_PUBLIC_HOST_URL}/properties/${property.id}`,
    },
    url: `${env.NEXT_PUBLIC_HOST_URL}/properties/${property.id}`,
  };
  return jsonLd;
};
