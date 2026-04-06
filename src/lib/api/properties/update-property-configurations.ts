import { fetchApi } from "../fetch-api";
import { Property } from "./type";

type UpdatePropertyConfigurationsPayload = {
  configurations: {
    is_popular?: boolean;
    is_njop_price?: boolean;
  };
};

export const updatePropertyConfigurations = async (
  propertyId: number,
  payload: UpdatePropertyConfigurationsPayload,
) => {
  return await fetchApi<Property>(`/properties/configurations/${propertyId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};
