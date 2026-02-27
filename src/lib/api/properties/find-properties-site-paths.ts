import { fetchApi } from "../fetch-api";

export const findPropertiesSitePaths = async () => {
  const path = "/properties/site-paths";
  return await fetchApi<string[]>(path);
};
