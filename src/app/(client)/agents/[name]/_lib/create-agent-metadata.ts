import { findPropertyByAgent } from "@/lib/api/properties/find-property-by-agent";
import { env } from "@/lib/env";
import { toTitleCase } from "@/lib/to-title-case";
import { Metadata } from "next";

export const createAgentMetadata = async (
  params: Promise<{
    name: string;
  }>,
): Promise<Metadata> => {
  const { name } = await params;
  const agentWithProperties = await findPropertyByAgent(name);
  return {
    title:
      toTitleCase(agentWithProperties.data?.agent.fullname ?? "") +
      "- Agen Properti PRIMEPRO INDONESIA",
    description:
      agentWithProperties.data?.agent.description ||
      `Agen properti ${agentWithProperties.data?.agent.fullname} dari Primepro Indonesia.`,
    twitter: {
      title: agentWithProperties.data?.agent.fullname,
      site: "@primeproindonesia",
      creator: "@primeproindonesia",
      card: "summary_large_image",
      images: [
        `${env.NEXT_PUBLIC_HOST_URL}${agentWithProperties.data?.agent.profile_picture_url}`,
      ],
    },
    openGraph: {
      title: agentWithProperties.data?.agent.fullname,
      description: agentWithProperties.data?.agent.description || "",
      siteName: "Primepro Indonesia",
      locale: "id_ID",
    },
    appleWebApp: true,
    applicationName: "Primepro Indonesia",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_HOST_URL}/agents/${agentWithProperties.data?.agent.fullname.replaceAll(" ", "-")}`,
    },
    robots: "index, follow",
  };
};
