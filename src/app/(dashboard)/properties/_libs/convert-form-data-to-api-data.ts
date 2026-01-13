import { CreateUpdatePropertyPayload } from "@/lib/api/properties/create-property";
import { CurrencyUnit, SoldChannel } from "@/lib/api/properties/type";
import { TFacility } from "@/lib/enums/facilities";
import { PropertyImage } from "@/lib/enums/property-image";

export type PropertyFormData = {
  title: string;
  description: string;
  province: string;
  regency: string;
  street: string;
  gmap_iframe: string;
  purchase_status: string;
  building_certificate: string;
  price: string;
  building_type: string;
  building_condition: string;
  building_furniture_capacity: string;
  land_area: string;
  building_area: string;
  building_level: string;
  electrical_power: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  carport: string;
  sold_channel?: string;
  currency: CurrencyUnit;
  rent_time?: string;
  description_seo?: string;
  price_down_payment?: string;
  developer_id?: string;
  bank_id?: string;
};

export const converPropertyFormDataToApiData = (
  formData: PropertyFormData,
  facilities: TFacility[],
  images: PropertyImage[],
): CreateUpdatePropertyPayload => {
  return {
    ...formData,
    price: formData.price ? parseInt(formData.price) : 0,
    building_furniture_capacity: formData.building_furniture_capacity
      ? formData.building_furniture_capacity
      : null,
    measurements: {
      land_area: formData.land_area ? parseInt(formData.land_area) : 0,
      building_area: formData.building_area
        ? parseInt(formData.building_area)
        : 0,
      building_level: formData.building_level
        ? parseInt(formData.building_level)
        : 0,
    },
    specifications: {
      electrical_power: formData.electrical_power
        ? parseInt(formData.electrical_power)
        : 0,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
      garage: formData.garage ? parseInt(formData.garage) : 0,
      carport: formData.carport ? parseInt(formData.carport) : 0,
    },
    facilities,
    images,
    sold_channel: formData.sold_channel
      ? (formData.sold_channel as SoldChannel)
      : undefined,
    rent_time: formData.rent_time ? formData.rent_time : undefined,
    description_seo: formData.description_seo
      ? formData.description_seo
      : undefined,
    price_down_payment: formData.price_down_payment
      ? parseInt(formData.price_down_payment)
      : 0,
    developer_id:
      formData.developer_id && formData.developer_id !== "0"
        ? Number(formData.developer_id)
        : null,
    bank_id:
      formData.bank_id && formData.bank_id !== "0"
        ? Number(formData.bank_id)
        : null,
  };
};
