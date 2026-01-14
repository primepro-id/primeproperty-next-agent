import { fetchApi } from "../fetch-api";
import { JsonFindApiResponse } from "../types/find-response";
import { Bank } from "./types";

const basePath = "/banks";

export const findManyBanks = async () => {
  return await fetchApi<JsonFindApiResponse<Bank>>(basePath);
};

export const findBankById = async (id: string) => {
  return await fetchApi<Bank>(`${basePath}/${id}`);
};

export const createBank = async (logo_path: string, name: string) => {
  return await fetchApi<Bank>(basePath, {
    method: "POST",
    body: JSON.stringify({ logo_path, name }),
  });
};

export const updateBank = async (
  id: string,
  logo_path: string | null,
  name: string | null,
) => {
  return await fetchApi<Bank>(`${basePath}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ logo_path, name }),
  });
};

export const deleteBank = async (id: string) => {
  return await fetchApi<Bank>(`${basePath}/${id}`, {
    method: "DELETE",
  });
};
