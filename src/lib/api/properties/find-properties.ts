import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { fetchApi } from "../fetch-api";
import { JsonFindApiResponse } from "../types/find-response";
import { Property } from "./type";
import { BuildingType } from "@/lib/enums/building-type";
import { Agent } from "./find-property-by-agent";
import { Developer } from "../developers";

export enum FindPropertySort {
  LowestPrice = "LowestPrice",
  HighestPrice = "HighestPrice",
}

export type FindPropertyQuery = {
  s?: string;
  province?: string;
  regency?: string;
  street?: string;
  page?: string;
  purchase_status?: PurchaseStatus | string;
  buiding_type?: BuildingType | string;
  sort?: FindPropertySort | string;
  is_popular?: "true" | "false";
  is_prime?: "true" | "false";
  limit?: string;
};

export type PropertyWithAgent = [Property, Agent, Developer | null];

export const findProperties = async (query?: FindPropertyQuery) => {
  let path = "/properties?";
  if (query?.s) {
    path += `&s=${query.s}`;
  }
  if (query?.province) {
    path += `&province=${query.province}`;
  }
  if (query?.regency) {
    path += `&regency=${query.regency}`;
  }
  if (query?.street) {
    path += `&street=${query.street}`;
  }
  if (query?.limit) {
    path += `&limit=${query.limit}`;
  }
  if (query?.page) {
    path += `&page=${query.page}`;
  }
  if (query?.purchase_status) {
    path += `&purchase_status=${query.purchase_status}`;
  }
  if (query?.buiding_type) {
    path += `&building_type=${query.buiding_type}`;
  }
  if (query?.sort) {
    path += `&sort=${query.sort}`;
  }
  if (query?.is_popular) {
    path += `&is_popular=${query.is_popular}`;
  }
  if (query?.is_prime) {
    path += `&is_prime=${query.is_prime}`;
  }

  return await fetchApi<JsonFindApiResponse<PropertyWithAgent>>(path);
};
