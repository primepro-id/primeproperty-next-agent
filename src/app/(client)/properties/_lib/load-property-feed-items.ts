import { findPropertyJoinAgent } from "@/lib/api/properties";
import {
  createPropertyPath,
  normalizeSeoText,
} from "@/lib/metadata/seo-domain";
import { RSS_ITEM_LIMIT } from "@/lib/rss/feed";
import type { Property } from "@/lib/types/properties";
import { PropertySoldStatus } from "@/lib/types/properties";
import { createArticleExcerpt } from "../../blog/_lib/create-article-excerpt";

async function loadAvailablePage(page: number) {
  const { data } = await findPropertyJoinAgent({
    page,
    limit: 100,
    sold_status: PropertySoldStatus.Available,
  });
  if (
    !data ||
    !Array.isArray(data.data) ||
    !Number.isInteger(data.pagination?.total_pages) ||
    data.pagination.total_pages < 0
  ) {
    throw new Error(`Property feed page ${page} is unavailable.`);
  }
  return data;
}

export async function loadPropertyFeedItems() {
  const properties = new Map<number, Property>();
  const firstPage = await loadAvailablePage(1);

  // The public API exposes price sorting only, so inspect every available page.
  for (
    let page = 1;
    page <= Math.max(1, firstPage.pagination.total_pages);
    page++
  ) {
    const { data } = page === 1 ? firstPage : await loadAvailablePage(page);
    for (const [property] of data) {
      if (
        !property.is_deleted &&
        property.sold_status === PropertySoldStatus.Available
      ) {
        properties.set(property.id, property);
      }
    }
  }

  return Array.from(properties.values())
    .map((property) => ({
      property,
      createdAt: Date.parse(property.created_at),
    }))
    .sort(
      (left, right) =>
        (right.createdAt || 0) - (left.createdAt || 0) ||
        right.property.id - left.property.id,
    )
    .slice(0, RSS_ITEM_LIMIT)
    .map(({ property }) => ({
      id: String(property.id),
      path: createPropertyPath(property),
      title: property.title,
      description: normalizeSeoText(
        createArticleExcerpt(property.description_seo ?? "") ||
          createArticleExcerpt(property.description),
        240,
      ),
      publishedAt: property.created_at,
    }));
}
