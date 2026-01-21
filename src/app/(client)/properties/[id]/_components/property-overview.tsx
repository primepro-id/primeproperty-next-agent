import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { PropertyInformation } from "./property-information";
import { FACILITY_ICON } from "@/lib/enums/facilities";
import { formatToCurrencyUnit } from "@/lib/intl/format-to-currency-unit";
import { cn } from "@/lib/utils";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RENT_TIME } from "@/lib/enums/rent_time";
import { Property } from "@/lib/api/properties/type";
import { GoogleTranslateElement } from "@/components/custom-ui/google-translate-element";

type PriceTagProps = {
  property: Property;
};

const PriceTag = ({ property }: PriceTagProps) => {
  return (
    <div className="border-l-4 border-primary pl-4">
      <div className="font-bold text-3xl flex items-center gap-2">
        <span>{formatToCurrencyUnit(property.price, property.currency)}</span>
        {property.purchase_status === PurchaseStatus.ForRent &&
          property.rent_time && <span>{RENT_TIME[property.rent_time]}</span>}
        <span>per Bulan</span>
      </div>
      <span
        className={cn(
          "text-sm text-muted-foreground",
          property.price_down_payment && property.price_down_payment > 0
            ? "block"
            : "hidden",
        )}
      >
        (Down Payment:{" "}
        {property?.price_down_payment &&
          property?.price_down_payment > 0 &&
          formatToCurrencyUnit(property.price_down_payment, property.currency)}
        ) )
      </span>
    </div>
  );
};

type PropertyOverviewProps = {
  property: PropertyWithAgent;
};

export const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  return (
    <div className="flex flex-col gap-8 flex-1 mb-8">
      <div>
        <GoogleTranslateElement />
        <PriceTag property={property[0]} />
        <h1 className="text-xl font-semibold mt-2">{property[0].title}</h1>
        <p className="text-base text-muted-foreground">
          {property[0].street}, {property[0].regency}
        </p>
      </div>

      <PropertyInformation property={property[0]} />

      <div className="flex flex-col">
        <p className="text-base font-semibold">Deskripsi</p>
        <p className="whitespace-pre-wrap text-muted-foreground text-base">
          {property[0].description}
        </p>
      </div>

      <div className={cn(property[0].facilities.length === 0 ? "hidden" : "")}>
        <p className="text-base font-semibold mb-2">Fasilitas</p>
        <div className="grid grid-cols-2 gap-4">
          {property[0].facilities.map((facility, index) => (
            <p
              key={`${index}-${facility.indonesian_label}`}
              className="flex items-center text-lg gap-2"
            >
              {FACILITY_ICON[facility.value]}
              <span className="capitalize text-sm text-muted-foreground">
                {facility.indonesian_label}
              </span>
            </p>
          ))}
        </div>
      </div>

      {property[0].gmap_iframe && (
        <div className="w-full overflow-hidden rounded">
          <p className="text-base font-semibold mb-2">Perkiraan Lokasi</p>

          <div
            title={property[0].title}
            dangerouslySetInnerHTML={{ __html: property[0].gmap_iframe }}
          />
        </div>
      )}
    </div>
  );
};
