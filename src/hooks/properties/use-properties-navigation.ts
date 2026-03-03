import { findPropertyNavigation } from "@/lib/api/properties/find-property-navigation";
import { useQuery } from "@tanstack/react-query";

export const usePropertiesNavigation = () => {
  return useQuery({
    gcTime: 0,
    queryKey: ["properties-navigation"],
    queryFn: async () => await findPropertyNavigation(),
  });
};
