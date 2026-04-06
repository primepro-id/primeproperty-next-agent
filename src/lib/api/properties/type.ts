import { BuildingCertificate } from "@/lib/enums/building-certificate";
import { BuildingCondition } from "@/lib/enums/building-condition";
import { BuildingType } from "@/lib/enums/building-type";
import { TFacility } from "@/lib/enums/facilities";
import { FurnitureCapacity } from "@/lib/enums/furniture-capacity";
import { PropertyImage } from "@/lib/enums/property-image";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RentTimeUnit } from "@/lib/enums/rent_time";
import { CurrencyUnit } from "@/lib/intl/format-to-currency-unit";

export enum SoldStatus {
  Available = "Available",
  Sold = "Sold",
}

export type Property = {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  site_path: string;
  title: string;
  description: string;
  province: string;
  regency: string;
  street: string;
  gmap_iframe: string;
  price: number;
  images: PropertyImage[];
  purchase_status: PurchaseStatus;
  sold_status: SoldStatus;
  measurements: PropertyMeasurements;
  building_type: BuildingType;
  building_condition: BuildingCondition;
  building_furniture_capacity: FurnitureCapacity | null;
  building_certificate: BuildingCertificate;
  specifications: PropertySpecifications;
  facilities: TFacility[];
  is_deleted: boolean;
  configurations: {
    is_popular?: boolean;
    is_njop_price?: boolean;
  };
  currency: CurrencyUnit;
  rent_time?: RentTimeUnit;
  description_seo?: string | null;
  price_down_payment?: number | null;
};

export type PropertyMeasurements = {
  building_area: number;
  building_level: number;
  land_area: number;
};

export type PropertySpecifications = {
  bathrooms: number;
  bedrooms: number;
  carport: number;
  electrical_power: number;
  garage: number;
};
