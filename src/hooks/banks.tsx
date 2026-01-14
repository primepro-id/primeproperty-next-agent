import { findBankById, findManyBanks } from "@/lib/api/banks";
import { queryOptions } from "@tanstack/react-query";

export const findManyBanksOptions = () => {
  return queryOptions({
    queryKey: ["banks"],
    queryFn: findManyBanks,
  });
};

export const findBankByIdOptions = (id: string) => {
  return queryOptions({
    queryKey: ["bank", id],
    queryFn: async () => await findBankById(id),
  });
};
