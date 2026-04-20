"use client";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { env } from "@/lib/env";
import { formatToCurrencyUnit } from "@/lib/intl/format-to-currency-unit";
import Link from "next/link";
import { ContactAgentDialog } from "./contact-agent-dialog";
import { Specifications } from "./specifications";
import { formatDateToIndonesian } from "@/lib/intl/format-date-to-indonesian";
import { WatermarkImage } from "@/components/custom-ui/watermark-image";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RENT_TIME } from "@/lib/enums/rent_time";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LuBookmark, LuBookmarkCheck, LuCircleUser } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { bookmarkProperty } from "../_lib/bookmark-property";
import { useQuery } from "@tanstack/react-query";
import { bookmarkedPropertyOptions } from "@/hooks/local-storage/bookmark";

type PropertyCardProps = {
  propertyWithAgent: PropertyWithAgent;
};

const PropertyContent = ({ propertyWithAgent }: PropertyCardProps) => {
  return (
    <div className="flex flex-col">
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
      <p className=" text-lg group-hover:underline line-clamp-2 font-sans">
        {propertyWithAgent[0].title}
      </p>
      <p className="text-muted-foreground group-hover:underline capitalize flex gap-1">
        {propertyWithAgent[0].street}, {propertyWithAgent[0].regency}
      </p>
      <p className="text-sm line-clamp-2 my-2 text-muted-foreground">
        {propertyWithAgent[0].description}
      </p>
      <Specifications propertyWithAgent={propertyWithAgent} />
    </div>
  );
};

export const PropertyCard = ({ propertyWithAgent }: PropertyCardProps) => {
  const bookmarkedQuery = useQuery(bookmarkedPropertyOptions());
  const baseImgPath = env.NEXT_PUBLIC_S3_ENDPOINT;
  const coverImage =
    propertyWithAgent[0].images.find((img) => img.is_cover) ??
    propertyWithAgent[0].images[0];

  return (
    <div className="flex flex-col gap-2">
      <Link
        title={propertyWithAgent[0].title}
        aria-label={propertyWithAgent[0].title}
        href={`/properties/${propertyWithAgent[0].id}`}
        className="relative group flex flex-col gap-2"
      >
        {propertyWithAgent[2] ? (
          <div className="bg-white absolute top-1 left-1 z-10 rounded-lg p-1 opacity-75">
            <Image
              width={100}
              height={100}
              src={env.NEXT_PUBLIC_S3_ENDPOINT + propertyWithAgent[2].logo_path}
              alt={propertyWithAgent[2].name}
              className="w-full object-cover "
            />
          </div>
        ) : (
          <div className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded absolute top-1 left-1 dark:font-semibold uppercase z-10">
            {propertyWithAgent[0].building_type}
          </div>
        )}
        <WatermarkImage
          watermarkProps={{
            fontSize: 20,
          }}
          imageProps={{
            src: baseImgPath + coverImage.path,
            alt: propertyWithAgent[0].title,
            width: 1024,
            height: 768,
            className: "w-full h-64 object-cover rounded-lg aspect-square",
          }}
        />

        {propertyWithAgent[0].configurations.is_njop_price && (
          <div className="bg-secondary text-primary-foreground px-2 py-1 text-xs rounded capitalize absolute top-[54%] right-1 font-semibold">
            HARGA NJOP
          </div>
        )}
        <Button
          size="icon"
          variant="outline"
          className="absolute right-1 top-1"
          onClick={(e) => {
            e.preventDefault();
            bookmarkProperty(propertyWithAgent[0].id);
            bookmarkedQuery.refetch();
          }}
        >
          {bookmarkedQuery?.data?.includes(propertyWithAgent[0].id) ? (
            <LuBookmarkCheck />
          ) : (
            <LuBookmark />
          )}
        </Button>
        <PropertyContent propertyWithAgent={propertyWithAgent} />
      </Link>
      <div className="flex items-center justify-between gap-4 w-full">
        <Link
          title={propertyWithAgent[1].fullname}
          aria-label={propertyWithAgent[1].fullname}
          href={`/agents/${propertyWithAgent[1].fullname.replaceAll(" ", "-")}`}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <div className="w-8 h-8">
            {propertyWithAgent[1].profile_picture_url ? (
              <Image
                src={
                  env.NEXT_PUBLIC_S3_ENDPOINT +
                  propertyWithAgent[1].profile_picture_url
                }
                alt={propertyWithAgent[1].fullname}
                width={100}
                height={100}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <LuCircleUser className="w-full h-full text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col font-sans ">
            <span className="text-xs text-muted-foreground">
              Diperbarui{" "}
              {formatDateToIndonesian(propertyWithAgent[0].updated_at)}
            </span>
            <span className="text-sm capitalize">
              {propertyWithAgent[1].fullname}
            </span>
          </div>
        </Link>
        <ContactAgentDialog
          isWhatsapp={true}
          propertyWithAgent={propertyWithAgent}
        />
      </div>
    </div>
  );
};
