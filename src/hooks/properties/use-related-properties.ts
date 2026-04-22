import { findRelatedProperties } from "@/lib/api/properties/find-related-properties";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useRelatedProperties = (
  id: number,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof findRelatedProperties>>>
  >,
) => {
  const useQueryKey = "related-properties";
  return useQuery({
    ...options,
    gcTime: 0,
    queryKey: [useQueryKey, id],
    queryFn: async () => await findRelatedProperties(id),
  });
};
