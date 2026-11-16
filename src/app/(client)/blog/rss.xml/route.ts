import { findArticles } from "@/lib/api/articles";
import { normalizeSeoText } from "@/lib/metadata/seo-domain";
import { createFeedHandler } from "@/lib/rss/create-feed-handler";
import { BLOG_FEED, RSS_ITEM_LIMIT } from "@/lib/rss/feed";
import { createArticleExcerpt } from "../_lib/create-article-excerpt";

export const GET = createFeedHandler(BLOG_FEED, async () => {
  const { allArticles } = await findArticles();
  return allArticles.slice(0, RSS_ITEM_LIMIT).map((article) => ({
    id: article.id,
    path: `/blog/${encodeURIComponent(article.slug)}`,
    title: article.title,
    description: normalizeSeoText(
      createArticleExcerpt(article.seo?.description ?? "") ||
        createArticleExcerpt(article.content),
      240,
    ),
    publishedAt: article._publishedAt,
  }));
});
