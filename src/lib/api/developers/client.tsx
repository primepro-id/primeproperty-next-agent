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

export const createDeveloper = async (logo_path: string, name: string) => {
  return await fetchApi<Developer>(basePath, {
    method: "POST",
    body: JSON.stringify({ logo_path, name }),
  });
};

export const updateDeveloper = async (
  id: string,
  logo_path: string | null,
  name: string | null,
) => {
  return await fetchApi<Developer>(`${basePath}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ logo_path, name }),
  });
};

export const deleteDeveloper = async (id: string) => {
  return await fetchApi<Developer>(`${basePath}/${id}`, {
    method: "DELETE",
  });
};
