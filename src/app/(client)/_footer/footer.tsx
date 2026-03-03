"use client";
import { createOrganizationSchema } from "@/lib/schema";
import Image from "next/image";
import Script from "next/script";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import {
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuYoutube,
  LuMail,
  LuPhone,
  LuCopyright,
} from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { usePropertiesNavigation } from "@/hooks/properties/use-properties-navigation";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { cn, toSlug } from "@/lib/utils";
import { PropertyNavigation } from "@/lib/api/properties/find-property-navigation";

const Organization = () => {
  return (
    <div id="organization" className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/images/primepro.png"
          alt="PrimePro Indonesia"
          width={25}
          height={25}
          id="logo"
        />
        <h2 className="text-lg font-semibold">PRIMEPRO INDONESIA</h2>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://www.facebook.com/share/1BHTU7HvZx/"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <LuFacebook />
        </Link>
        <Link
          href="https://www.instagram.com/primepro_id/"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <LuInstagram />
        </Link>
        <Link
          href="https://www.linkedin.com/company/primepro-indonesia/"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <LuLinkedin />
        </Link>
        <Link
          href="https://www.youtube.com/@primeproindonesia"
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <LuYoutube />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <LuMail />
        <p>primeproagent@gmail.com</p>
      </div>
      <div className="flex items-center gap-4">
        <LuPhone />
        <p>+62-821-1616-2995</p>
      </div>
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <MdOutlineLocationOn />
        </div>
        <div>
          <p>Kemang Icon Jakarta,</p>
          <p>Jl. Kemang Raya No 1,</p>
          <p>Jakarta Selatan, 12730</p>
        </div>
      </div>
    </div>
  );
};

type ForSaleListProps = {
  navigations?: PropertyNavigation[];
};

const ForSaleList = ({ navigations }: ForSaleListProps) => {
  const forSaleBuildingTypes = new Map(
    navigations
      ?.sort((a, b) => a.building_type.localeCompare(b.building_type))
      .map((d) => [
        d.building_type,
        {
          label: d.building_type,
          value: `/dijual/${toSlug(d.building_type)}`,
        },
      ]),
  );
  const forSaleHomeRegency = new Map(
    navigations
      ?.filter((b) => b.building_type === "rumah")
      .sort((a, b) => a.regency.localeCompare(b.regency))
      .map((d) => [
        d.regency,
        {
          label: d.regency,
          value: `/dijual/rumah/${toSlug(d.province)}/${toSlug(d.regency)}`,
        },
      ]),
  );
  const forSaleHomeStreet = new Map(
    navigations
      ?.filter((b) => b.building_type === "rumah")
      .sort((a, b) => a.street.localeCompare(b.street))
      .map((d) => [
        d.street,
        {
          label: d.street,
          value: `/dijual/rumah/${toSlug(d.province)}/${toSlug(d.regency)}/${d.street}`,
        },
      ]),
  );
  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4 ">
      <ul className="flex flex-col">
        {Array.from(forSaleBuildingTypes.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`${b.label} Dijual`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              {b.label} Dijual
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {Array.from(forSaleHomeRegency.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`Rumah Dijual di ${b.label}`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              Rumah Dijual {b.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col md:col-span-2 md:grid-cols-2 md:grid ">
        {Array.from(forSaleHomeStreet.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`Rumah Dijual di ${b.label}`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              Rumah Dijual {b.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ForRentList = ({ navigations }: ForSaleListProps) => {
  const forRentBuildingTypes = new Map(
    navigations
      ?.sort((a, b) => a.building_type.localeCompare(b.building_type))
      .map((d) => [
        d.building_type,
        {
          label: d.building_type,
          value: `/disewa/${toSlug(d.building_type)}`,
        },
      ]),
  );
  const forRentHomeStreet = new Map(
    navigations
      ?.filter((b) => b.building_type === "rumah")
      .sort((a, b) => a.street.localeCompare(b.street))
      .map((d) => [
        d.street,
        {
          label: d.street,
          value: `/disewa/rumah/${toSlug(d.province)}/${toSlug(d.regency)}/${d.street}`,
        },
      ]),
  );
  const forRentApartmentStreet = new Map(
    navigations
      ?.filter((b) => b.building_type === "apartemen")
      .sort((a, b) => a.street.localeCompare(b.street))
      .map((d) => [
        d.street,
        {
          label: d.street,
          value: `/disewa/apartemen/${toSlug(d.province)}/${toSlug(d.regency)}/${d.street}`,
        },
      ]),
  );
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <ul className="flex flex-col">
        {Array.from(forRentBuildingTypes.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`${b.label} Disewa`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              {b.label} Disewa
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col ">
        {Array.from(forRentHomeStreet.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`Rumah Disewa di ${b.label}`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              Rumah Disewa {b.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col ">
        {Array.from(forRentApartmentStreet.values()).map((b) => (
          <li key={b.value} className="list-disc list-inside">
            <Link
              title={`Apartemen Disewa di ${b.label}`}
              href={`/properties/filter${b.value}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "justify-start capitalize text-base px-0",
              )}
            >
              Apartemen Disewa {b.label}
            </Link>
          </li>
        ))}
      </ul>
      <Organization />
    </div>
  );
};

const FooterNavigation = () => {
  const nav = usePropertiesNavigation();
  const forSaleNav = nav?.data?.data?.filter(
    (b) => b.purchase_status === PurchaseStatus.ForSale,
  );

  const forRentNav = nav?.data?.data?.filter(
    (b) => b.purchase_status === PurchaseStatus.ForRent,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full lg:flex-1">
        <h3 className="text-xl font-semibold">
          Properti Dijual PrimePro Indonesia
        </h3>
        <ForSaleList navigations={forSaleNav} />
      </div>
      <div className="flex flex-col gap-4 w-full lg:flex-1">
        <h3 className="text-xl font-semibold">
          Properti Disewa PrimePro Indonesia
        </h3>
        <ForRentList navigations={forRentNav} />
      </div>
    </div>
  );
};

export const Footer = () => {
  const organizationSchema = createOrganizationSchema();
  return (
    <>
      <Script
        id="website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <footer className="container mx-auto p-4 flex flex-col gap-8">
        <FooterNavigation />
        <div className="flex items-center lg:justify-center gap-4 text-muted-foreground ">
          <LuCopyright />
          <span className="text-xs ">
            PrimePro Indonesia {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </>
  );
};
