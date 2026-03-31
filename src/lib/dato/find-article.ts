import { gql } from "@apollo/client";
import { createDatoApolloClient } from "./create-dato-apollo-client";
import { Article } from "./types";

const ARTICLE_QUERY = gql`
  query FindArticleBySlug($slug: String!) {
    article(filter: { slug: { eq: $slug } }) {
      id
      thumbnail {
        url
      }
      title
      content(markdown: true)
      slug
      _publishedAt
      _updatedAt
      seo {
        title
        description
      }
      showRelatedProperties
      relatedProperties
    }
    allArticles(filter: { slug: { neq: $slug } }, first: 10) {
      title
      slug
      _publishedAt
      _updatedAt
      thumbnail {
        url
      }
    }
  }
`;

export const findArticle = async (
  slug: string,
): Promise<{
  article: Article;
  allArticles: Pick<
    Article,
    "title" | "slug" | "thumbnail" | "_publishedAt" | "_updatedAt"
  >[];
}> => {
  try {
    const client = createDatoApolloClient();
    const { data } = await client.query({
      query: ARTICLE_QUERY,
      variables: {
        slug,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    throw error;
  }
};
