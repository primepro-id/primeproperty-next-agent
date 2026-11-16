import { Metadata } from "next";
import { env } from "../env";
import { RSS_CONTENT_TYPE } from "../rss/feed";
import { createSeoMetadataFields } from "./seo-domain";

type MetadataParams = {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
  rssTitle?: string;
};

export const createMetadata = ({
  title,
  description,
  path,
  image = `${env.NEXT_PUBLIC_HOST_URL}/images/primepro.png`,
  index = true,
  rssTitle,
}: MetadataParams): Metadata => {
  const metadata = createSeoMetadataFields({
    hostUrl: env.NEXT_PUBLIC_HOST_URL,
    title,
    description,
    path,
    image,
    index,
  });
  if (!rssTitle) return metadata;

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        [RSS_CONTENT_TYPE]: [
          { url: `${metadata.alternates.canonical}/rss.xml`, title: rssTitle },
        ],
      },
    },
  };
};
