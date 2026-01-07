import { findManyDevelopers } from "@/lib/api/developers";
import { queryOptions } from "@tanstack/react-query";

export const findManyDevelopersOptions = () => {
  return queryOptions({
    queryKey: ["developers"],
    queryFn: findManyDevelopers,
  });
};
