import { env } from "@/lib/env";
import { unstable_cache } from "next/cache";
import {
  RSS_CONTENT_TYPE,
  serializeRss,
  type RssChannel,
  type RssItem,
} from "./feed";

export function createFeedHandler(
  channel: RssChannel,
  loadItems: () => Promise<RssItem[]>,
) {
  const getFeed = unstable_cache(
    async () =>
      serializeRss(env.NEXT_PUBLIC_HOST_URL, channel, await loadItems()),
    ["rss-v1", env.NEXT_PUBLIC_HOST_URL, channel.path],
    { revalidate: 900 },
  );

  return async function GET() {
    try {
      return new Response(await getFeed(), {
        headers: { "Content-Type": `${RSS_CONTENT_TYPE}; charset=utf-8` },
      });
    } catch (error) {
      console.error(`Unable to generate ${channel.path} RSS feed.`, error);
      return new Response("RSS feed is temporarily unavailable.", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }
  };
}
