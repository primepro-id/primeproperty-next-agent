import { TFacility } from "@/lib/enums/facilities";
import { fetchApi } from "../fetch-api";
import { PropertyImage } from "@/lib/enums/property-image";
import {
  CurrencyUnit,
  Property,
  PropertyMeasurements,
  PropertySpecifications,
  SoldChannel,
} from "./type";

export type CreateUpdatePropertyPayload = {
  title: string;
  description: string;
  province: string;
  regency: string;
  street: string;
  gmap_iframe: string;
  price: number;
  images: PropertyImage[];
  purchase_status: string;
  sold_status?: string;
  measurements: PropertyMeasurements;
  building_type: string;
  building_condition: string;
  building_furniture_capacity: string | null;
  building_certificate: string;
  specifications: PropertySpecifications;
  facilities: TFacility[];
  sold_channel?: SoldChannel | null;
  currency: CurrencyUnit;
  rent_time?: string | null;
  description_seo?: string | null;
  price_down_payment?: number | null;
  developer_id?: number | null;
};

export const createProperty = async (payload: CreateUpdatePropertyPayload) => {
  return await fetchApi<Property>(`/properties`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
