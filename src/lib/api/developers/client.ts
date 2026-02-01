import { fetchApi } from "../fetch-api";
import { JsonFindApiResponse } from "../types/find-response";
import { Developer } from "./types";

const basePath = "/developers";

export const findManyDevelopers = async () => {
  return await fetchApi<JsonFindApiResponse<Developer>>(basePath);
};

export const findDeveloperById = async (id: string) => {
  return await fetchApi<Developer>(`${basePath}/${id}`);
};
