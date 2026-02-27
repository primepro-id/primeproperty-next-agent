import { JsonApiResponse } from "@/lib/api/fetch-api";
import { findPropertiesSitePaths } from "@/lib/api/properties/find-properties-site-paths";
import { useQuery } from "@tanstack/react-query";

export const usePropertiesSitePaths = (startSearch: boolean) => {
  const useQueryKey = "properties-site-paths";
  return useQuery<JsonApiResponse<string[]>>({
    queryKey: [useQueryKey, startSearch],
    queryFn: async () => {
      if (startSearch) return await findPropertiesSitePaths();
      return {
        status: 200,
        data: [],
        message: "",
      };
    },
  });
};
