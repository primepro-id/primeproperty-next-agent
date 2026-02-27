import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { PurchaseStatus } from "@/lib/enums/purchase-status";

export const parseFilterParams = (params: string[]): FindPropertyQuery => {
  const baseQuery: FindPropertyQuery = {};

  if (params?.[0]) {
    const purchaseStatusQuery = params?.[0] as "dijual" | "disewa";
    switch (purchaseStatusQuery) {
      case "dijual":
        baseQuery.purchase_status = PurchaseStatus.ForSale;
        break;
      case "disewa":
        baseQuery.purchase_status = PurchaseStatus.ForRent;
        break;
    }
  }

  if (params?.[1]) {
    const buildingTypeQuery = params?.[1];
    baseQuery.buiding_type = buildingTypeQuery
      .toLowerCase()
      .replaceAll("-", " ");
  }

  if (params?.[2]) {
    const provinceQuery = params?.[2];
    baseQuery.province = provinceQuery.toLowerCase().replaceAll("-", " ");
  }

  if (params?.[3]) {
    const regencyQuery = params?.[3];
    baseQuery.regency = regencyQuery.toLowerCase().replaceAll("-", " ");
  }

  if (params?.[4]) {
    const streetQuery = params?.[4];
    baseQuery.street = streetQuery.toLowerCase().replaceAll("-", " ");
  }

  return baseQuery;
};
