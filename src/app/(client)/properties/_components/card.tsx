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
import { LuCircleUser } from "react-icons/lu";

type PropertyCardProps = {
  propertyWithAgent: PropertyWithAgent;
};

const PropertyContent = ({ propertyWithAgent }: PropertyCardProps) => {
  return (
    <div className="flex flex-col gap-1 mt-1">
      <div className="flex items-center gap-2 ">
        <strong className="text-2xl flex items-center gap-1 group-hover:underline">
          <span>
            {formatToCurrencyUnit(
              propertyWithAgent[0].price,
              propertyWithAgent[0].currency,
            )}
          </span>
          {propertyWithAgent[0].purchase_status === PurchaseStatus.ForRent &&
            propertyWithAgent[0].rent_time && (
              <span>{RENT_TIME[propertyWithAgent[0].rent_time]}</span>
            )}
        </strong>

        <span
          className={cn(
            "text-md text-muted-foreground",
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
        </span>
      </div>
      <h2 className="text-xl group-hover:underline line-clamp-2">
        {propertyWithAgent[0].title}
      </h2>
      <h3 className="text-sm font-semibold text-muted-foreground group-hover:underline capitalize flex gap-1">
        {propertyWithAgent[0].building_type} <p className="lowercase">di</p>
        {propertyWithAgent[0].street}, {propertyWithAgent[0].regency}
      </h3>
      <p className="text-xs line-clamp-2 mb-1">
        {propertyWithAgent[0].description_seo
          ? propertyWithAgent[0].description_seo
          : propertyWithAgent[0].description}
      </p>
      <Specifications propertyWithAgent={propertyWithAgent} />
    </div>
  );
};

export const PropertyCard = ({ propertyWithAgent }: PropertyCardProps) => {
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
        className="relative group"
      >
        {propertyWithAgent?.[2] && (
          <div className="bg-white absolute top-1 left-1 z-10 rounded p-1 opacity-50">
            <Image
              width={100}
              height={100}
              src={env.NEXT_PUBLIC_S3_ENDPOINT + propertyWithAgent[2].logo_path}
              alt={propertyWithAgent[2].name}
              className="w-full object-cover "
            />
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

        <div className="bg-background bg-opacity-50 px-2 py-1 text-xs rounded capitalize absolute top-1 right-1">
          {propertyWithAgent[0].building_type}
        </div>
        <PropertyContent propertyWithAgent={propertyWithAgent} />
      </Link>
      <div className="flex items-center justify-between gap-4 w-full">
        <Link
          title={propertyWithAgent[1].fullname}
          aria-label={propertyWithAgent[1].fullname}
          href={`/agents/${propertyWithAgent[1].fullname.replaceAll(" ", "-")}`}
          className="flex items-center gap-1 hover:underline hover:underline-offset-4"
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
          <div className="flex flex-col text-xs">
            <span>
              Diperbarui{" "}
              {formatDateToIndonesian(propertyWithAgent[0].updated_at)}
            </span>
            <span className="capitalize">{propertyWithAgent[1].fullname}</span>
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
