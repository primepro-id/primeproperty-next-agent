export enum PurchaseStatus {
  ForSale = "ForSale",
  ForRent = "ForRent",
}

export const PURCHASE_STATUS = [
  {
    value: PurchaseStatus.ForSale,
    indonesian_label: "dijual",
    english_label: "For Sale",
  },
  {
    value: PurchaseStatus.ForRent,
    indonesian_label: "disewa",
    english_label: "For Rent",
  },
];
