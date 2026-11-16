import { createFeedHandler } from "@/lib/rss/create-feed-handler";
import { PROPERTY_FEED } from "@/lib/rss/feed";
import { loadPropertyFeedItems } from "../_lib/load-property-feed-items";

export const GET = createFeedHandler(PROPERTY_FEED, loadPropertyFeedItems);
