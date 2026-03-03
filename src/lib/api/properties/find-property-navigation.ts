import { fetchApi } from "../fetch-api";
import { Property } from "./type";

export type PropertyNavigation = Pick<
  Property,
  | "site_path"
  | "purchase_status"
  | "building_type"
  | "province"
  | "regency"
  | "street"
>;

export const findPropertyNavigation = async () => {
  return await fetchApi<PropertyNavigation[]>(`/properties/navigation`);
};
