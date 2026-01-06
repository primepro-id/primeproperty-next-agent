import { fetchApi } from "../fetch-api";
import { JsonFindApiResponse } from "../types/find-response";
import { Developer } from "./types";

const basePath = "/developers";

export const findManyDevelopers = async () => {
  return await fetchApi<JsonFindApiResponse<Developer>>(basePath);
};

export const findDeveloperBySlug = async (slug: string) => {
  return await fetchApi<Developer>(`${basePath}/slug/${slug}`);
};

export const findDeveloperById = async (id: string) => {
  return await fetchApi<Developer>(`${basePath}/${id}`);
};

export const createDeveloper = async (picture_url: string, name: string) => {
  return await fetchApi<Developer>(basePath, {
    method: "POST",
    body: JSON.stringify({ picture_url, name }),
  });
};

export const updateDeveloper = async (
  id: number,
  picture_url?: string | null,
  name?: string | null,
) => {
  return await fetchApi<Developer>(`${basePath}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ picture_url, name }),
  });
};
