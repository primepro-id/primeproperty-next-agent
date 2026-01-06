import { findDeveloperBySlug, findManyDevelopers } from "@/lib/api/developers";
import { queryOptions } from "@tanstack/react-query";

export const findManyDevelopersOptions = () => {
  return queryOptions({
    queryKey: ["developers"],
    queryFn: findManyDevelopers,
  });
};

export const findDeveloperBySlugOptions = (slug: string) => {
  return queryOptions({
    enabled: !!slug,
    queryKey: ["developer", slug],
    queryFn: () => findDeveloperBySlug(slug),
  });
};
