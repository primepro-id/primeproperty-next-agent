import { env } from "../env";

export const createOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    id: "#organization",
    description:
      "Your private key to exceptional properties. Jual dan beli properti secara online dengan layanan terbaik di PrimePro Indonesia.",
    email: "primeproagent@gmail.com",
    legalName: "PT. Prima Berkat Propertindo",
    name: "Primepro Indonesia",
    sameAs: "https://www.facebook.com/PrimePro-Indonesia",
    // @ts-expect-error brand
    sameAs: "https://www.instagram.com/primepro_id/",
    // @ts-expect-error brand
    sameAs: "https://www.linkedin.com/company/primepro-indonesia/",
    // @ts-expect-error brand
    sameAs: "https://www.youtube.com/@primeproindonesia",
    slogan: "Your private key to exceptional properties",
    telephone: "0821-1616-2995",
    url: env.NEXT_PUBLIC_HOST_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl Pakubuwono VI No. 35",
      addressLocality: "Kebayoran Baru, Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12730",
      addressCountry: {
        "@type": "Country",
        name: "ID",
      },
    },
    logo: {
      "@type": "ImageObject",
      id: "logo",
      url: `${env.NEXT_PUBLIC_HOST_URL}/images/primepro-with-full-text.png`,
      width: 512,
      height: 512,
    },
  };
};
