import {
  findProperties,
  FindPropertyQuery,
} from "@/lib/api/properties/find-properties";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useProperties = (
  query?: FindPropertyQuery,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof findProperties>>>
  >,
) => {
  const useQueryKey = "properties";
  return useQuery({
    ...options,
    gcTime: 0,
    queryKey: [useQueryKey, query],
    queryFn: async () => await findProperties(query),
  });
};
