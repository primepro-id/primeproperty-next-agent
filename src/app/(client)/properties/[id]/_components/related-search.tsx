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
          title={`Properti di ${property.province}`}
          aria-label={`Properti di ${property.province}`}
          href={`/properties?buiding_type=${property.building_type.replaceAll(" ", "+")}&province=${property.province.replaceAll(" ", "+")}&page=1`}
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
          title={`Properti di ${property.regency}`}
          aria-label={`Properti di ${property.regency}`}
          href={`/properties?buiding_type=${property.building_type.replaceAll(" ", "+")}&regency=${property.regency.replaceAll(" ", "+")}&page=1`}
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
          title={`Properti di ${property.street}`}
          aria-label={`Properti di ${property.street}`}
          href={`/properties?buiding_type=${property.building_type.replaceAll(" ", "+")}&street=${property.street.replaceAll(" ", "+")}&page=1`}
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
