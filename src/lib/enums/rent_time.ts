export enum RentTimeUnit {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export const RENT_TIME = {
  [RentTimeUnit.Monthly]: "/bulan",
  [RentTimeUnit.Yearly]: "/tahun",
};
