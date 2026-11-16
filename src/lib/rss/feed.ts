export const RSS_CONTENT_TYPE = "application/rss+xml";
export const RSS_ITEM_LIMIT = 20;

export const BLOG_FEED = {
  path: "/blog",
  title: "PrimePro Indonesia Blog",
  description: "Artikel terbaru seputar properti dari PrimePro Indonesia.",
};

export const PROPERTY_FEED = {
  path: "/properties",
  title: "Properti Terbaru | PrimePro Indonesia",
  description: "Properti terbaru yang tersedia untuk dijual atau disewa.",
};

export type RssItem = {
  id: string;
  path: string;
  title: string;
  description: string;
  publishedAt: string;
};

export type RssChannel = typeof BLOG_FEED;

function escapeXml(value: string) {
  // Strip characters XML 1.0 cannot represent, including unpaired surrogates.
  return value
    .replace(
      /[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\u{10000}-\u{10ffff}]/gu,
      "",
    )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function serializeRss(
  hostUrl: string,
  channel: RssChannel,
  items: RssItem[],
) {
  const channelUrl = new URL(channel.path, hostUrl).href;
  const feedUrl = new URL(`${channel.path}/rss.xml`, hostUrl).href;
  const entries = items.map((item) => {
    const date = new Date(item.publishedAt);
    const description = escapeXml(escapeXml(item.description));

    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(new URL(item.path, hostUrl).href)}</link>
      <guid isPermaLink="false">${escapeXml(`${channelUrl}#${item.id}`)}</guid>
      <description>${description}</description>${
        Number.isFinite(date.getTime())
          ? `\n      <pubDate>${date.toUTCString()}</pubDate>`
          : ""
      }
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channelUrl)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>id-ID</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="${RSS_CONTENT_TYPE}" />
${entries.join("\n")}
  </channel>
</rss>
`;
}
