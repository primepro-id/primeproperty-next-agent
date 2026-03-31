import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { env } from "../env";

const httpLink = new HttpLink({
  uri: env.DATOCMS_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${env.DATOCMS_API_TOKEN}`,
    "X-Api-Version": "3",
  },
});

export const createDatoApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
