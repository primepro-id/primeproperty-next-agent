import { buttonVariants } from "@/components/ui/button";
import { Property } from "@/lib/api/properties/type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

type RelatedSearchProps = {
  property: Property;
  className?: string;
};

export const RelatedSearch = ({ property, className }: RelatedSearchProps) => {
  return (
    <div id="related" className={cn("rounded border h-fit", className)}>
      <h3 className="text-lg font-bold border-b py-2 px-4">
        Pencarian Terkait
      </h3>

      <div className="flex flex-col gap-2">
        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              className: "uppercase justify-between",
            }),
          )}
          title={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.province.replaceAll(" ", "-")}`}
          aria-label={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.province.replaceAll(" ", "-")}`}
          href={`/properties/${property.purchase_status === "ForSale" ? "dijual" : "disewa"}/${property.building_type}/${property.province.replaceAll(" ", "-")}`}
        >
          <span>
            {property.building_type} di {property.province}
          </span>
          <LuChevronRight />
        </Link>
        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              className: "uppercase justify-between",
            }),
          )}
          title={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.regency.replaceAll(" ", "-")}, ${property.province.replaceAll(" ", "-")}`}
          aria-label={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.regency.replaceAll(" ", "-")}, ${property.province.replaceAll(" ", "-")}`}
          href={`/properties/${property.purchase_status === "ForSale" ? "dijual" : "disewa"}/${property.building_type}/${property.province.replaceAll(" ", "-")}/${property.regency.replaceAll(" ", "-")}`}
        >
          <span>
            {property.building_type} di {property.regency}
          </span>
          <LuChevronRight />
        </Link>
        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              className: "uppercase justify-between",
            }),
          )}
          title={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.street.replaceAll(" ", "-")}, ${property.regency.replaceAll(" ", "-")}`}
          aria-label={`${property.building_type} ${property.purchase_status === "ForSale" ? "dijual" : "disewa"} di ${property.street.replaceAll(" ", "-")}, ${property.regency.replaceAll(" ", "-")}`}
          href={`/properties/${property.purchase_status === "ForSale" ? "dijual" : "disewa"}/${property.building_type}/${property.province.replaceAll(" ", "-")}/${property.regency.replaceAll(" ", "-")}/${property.street.replaceAll(" ", "-")}`}
        >
          <span>
            {property.building_type} di {property.street}
          </span>
          <LuChevronRight />
        </Link>
      </div>
    </div>
  );
};
