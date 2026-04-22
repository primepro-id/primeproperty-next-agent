import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RENT_TIME } from "@/lib/enums/rent_time";
import { formatToCurrencyUnit } from "@/lib/intl/format-to-currency-unit";
import { cn } from "@/lib/utils";

export const PropertyPriceTag = ({
  propertyWithAgent,
}: {
  propertyWithAgent: PropertyWithAgent;
}) => {
  return (
    <div className="flex items-center gap-2 text-primary font-semibold">
      <div className="font-semibold text-lg flex items-center gap-1 group-hover:underline">
        <p>
          {formatToCurrencyUnit(
            propertyWithAgent[0].price,
            propertyWithAgent[0].currency,
          )}
        </p>
        {propertyWithAgent[0].purchase_status === PurchaseStatus.ForRent &&
          propertyWithAgent[0].rent_time && (
            <p>{RENT_TIME[propertyWithAgent[0].rent_time]}</p>
          )}
      </div>

      <p
        className={cn(
          "text-md",
          propertyWithAgent[0].price_down_payment &&
            propertyWithAgent[0].price_down_payment > 0
            ? "block"
            : "hidden",
        )}
      >
        (DP:{" "}
        {propertyWithAgent?.[0]?.price_down_payment &&
          propertyWithAgent?.[0]?.price_down_payment > 0 &&
          formatToCurrencyUnit(
            propertyWithAgent[0].price_down_payment,
            propertyWithAgent[0].currency,
          )}
        )
      </p>
    </div>
  );
};
