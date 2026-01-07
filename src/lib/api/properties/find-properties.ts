import { Agent } from "../agents/type";
import { fetchApi } from "../fetch-api";
import { JsonFindApiResponse } from "../types/find-response";
import { Property, SoldStatus } from "./type";

export type FindPropertyQuery = {
  s?: string;
  province?: string;
  regency?: string;
  page?: string;
  is_popular?: string;
  sold_status?: SoldStatus;
  limit?: string;
  developer_id?: string;
};

export type PropertyWithAgent = [Property, Agent];

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
  if (query?.limit) {
    path += `&limit=${query.limit}`;
  }
  if (query?.page) {
    path += `&page=${query.page}`;
  }
  if (query?.is_popular === "true") {
    path += `&is_popular=true`;
  }
  if (
    query?.sold_status === SoldStatus.Available ||
    query?.sold_status === SoldStatus.Sold
  ) {
    path += `&sold_status=${query.sold_status}`;
  }
  if (query?.developer_id && query?.developer_id !== "0") {
    path += `&developer_id=${query?.developer_id}`;
  }
  return await fetchApi<JsonFindApiResponse<PropertyWithAgent>>(path);
};
