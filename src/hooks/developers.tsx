import { findDeveloperById, findManyDevelopers } from "@/lib/api/developers";
import { queryOptions } from "@tanstack/react-query";

export const findManyDevelopersOptions = () => {
  return queryOptions({
    queryKey: ["developers"],
    queryFn: findManyDevelopers,
  });
};

export const findDeveloperByIdOptions = (id: string) => {
  return queryOptions({
    queryKey: ["developer", id],
    queryFn: async () => await findDeveloperById(id),
  });
};
