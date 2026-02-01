import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { PURCHASE_STATUS, PurchaseStatus } from "@/lib/enums/purchase-status";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type PropertiesTitleProps = {
  propertyCount: number;
  searchParams: FindPropertyQuery;
  className?: string;
};

const createLocation = (
  province?: string,
  regency?: string,
  street?: string,
) => {
  if (street) {
    return street;
  }
  if (regency) {
    return regency;
  }
  if (province) {
    return province;
  }

  return "Indonesia";
};

const Title = ({
  propertyCount,
  searchParams,
  className,
}: PropertiesTitleProps) => {
  const baseClassname = "flex gap-1 text-3xl font-sans flex-wrap capitalize";
  if (
    propertyCount === 0 &&
    Object.values(searchParams).filter((val) => val).length === 0
  ) {
    return (
      <h1 className={cn(baseClassname, className)}>
        Pencarian tidak ditemukan
      </h1>
    );
  }

  return (
    <h1 className={cn(baseClassname, className)}>
      {propertyCount === 0 && "Pencarian tidak ditemukan untuk "}
      {searchParams.buiding_type ? searchParams.buiding_type : "properti"}{" "}
      {searchParams.purchase_status
        ? PURCHASE_STATUS[
            searchParams.purchase_status as PurchaseStatus
          ].toLowerCase()
        : ""}{" "}
      <p className="lowercase">di</p>
      {createLocation(
        searchParams.province,
        searchParams.regency,
        searchParams.street,
      )}
    </h1>
  );
};

export const PropertiesTitle = ({
  propertyCount,
  searchParams,
  className,
}: PropertiesTitleProps) => {
  const showCount = useMemo(() => {
    let startCount = 1;
    let endCount = 30;
    if (searchParams.page && Number(searchParams?.page) > 1) {
      startCount = (Number(searchParams.page) - 1) * 30 + 1;
      endCount = Number(searchParams.page) * 30;
    }

    if (endCount > propertyCount) endCount = propertyCount;

    return `${startCount} - ${endCount}`;
  }, [searchParams.page, propertyCount]);
  return (
    <div className="flex flex-col">
      <Title
        propertyCount={propertyCount}
        searchParams={searchParams}
        className={className}
      />
      {propertyCount > 0 && (
        <p className="text-muted-foreground">
          Menampilkan {showCount} dari {propertyCount} properti
        </p>
      )}
    </div>
  );
};
