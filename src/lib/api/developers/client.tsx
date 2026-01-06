import { fetchApi } from "../fetch-api";

const basePath = "/developers";

export const findManyDevelopers = async () => {
  return await fetchApi(basePath);
};
