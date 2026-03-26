import Link from "next/link";
import { PopularProperties } from "./properties/_components";
import { LuHouse } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Search } from "./properties/_components/fillters/search";
import { FilterDialog } from "./properties/_components/fillters";
import { Faq } from "./properties/_components/faq";
import { createWebsiteSchema } from "@/lib/schema";
import Script from "next/script";
import { PrimeProperties } from "./properties/_components/prime-properties";
import { findManyDevelopers } from "@/lib/api/developers";
import { env } from "@/lib/env";

export const revalidate = 0;

const Hero = () => {
  const websiteSchema = createWebsiteSchema();
  return (
    <>
      <Script
        id="website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex flex-col gap-4 my-8 lg:my-16" id="website">
        <div className="w-fit mx-auto flex flex-col gap-2 items-center justify-center ">
          <Image
            src="/images/primepro.png"
            alt="Primepro Hero"
            width={175}
            height={175}
            className="mb-8"
          />
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight lg:tracking-normal">
            PRIMEPRO INDONESIA
          </h1>
          <h2 className="border-b text-xl lg:text-2xl tracking-tight text-muted-foreground lg:tracking-normal">
            Your Private Key to Exceptional Properties
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center mx-auto p-2 bg-secondary md:max-w-2xl w-full rounded gap-1">
            <Search />
            <FilterDialog searchParams={{}} />
          </div>
          <Link
            href="/properties"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit mx-auto",
            )}
          >
            <LuHouse />
            Lihat Semua
          </Link>
        </div>
      </div>
    </>
  );
};

const Partners = () => {
  const PARTNERS = [
    "/images/banks/bca.png",
    "/images/banks/bni.png",
    "/images/banks/bri.png",
    "/images/banks/bsi.png",
    "/images/banks/mandiri.webp",
    "/images/banks/cimb.png",
    "/images/banks/ocbc.png",
    "/images/banks/panin.png",
    "/images/banks/permata.png",
    "/images/banks/danamon.webp",
    "/images/banks/maybank.png",
    "/images/banks/smbc.png",
  ];
  return (
    <div className="my-16 flex flex-col gap-4 lg:gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-3xl font-bold ">Mitra Kami</h3>
        <h4 className="text-muted-foreground text-base lg:text-lg">
          Konsisten memberikan layanan terbaik, menjalin kemitraan dengan
          perbankan untuk kemudahan transaksi Anda
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
        {PARTNERS.map((part, index) => (
          <Image
            key={`partner_${index}`}
            src={part}
            alt={part}
            width={576}
            height={576}
            className="w-full h-20 lg:h-40 border p-2 object-contain aspect-square rounded "
          />
        ))}
      </div>
    </div>
  );
};

const VideoThumbnail = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-0">
      <div className="flex flex-col gap-4 container mx-auto">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-left lg:text-3xl">
            Your Private Real Estate Partner
          </h3>
          <h4>Agen Properti berpengalaman dan terpercaya</h4>
        </div>
        <iframe
          width="100%"
          src="https://www.youtube.com/embed/ivN7BfhMv4g?si=zLm4yBwIrF7So1wM"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-96 md:h-[400px] lg:h-[600px] rounded-lg"
        />
      </div>
    </div>
  );
};

const Developers = async () => {
  const developers = await findManyDevelopers();
  if (developers.data && developers.data?.data.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold ">Rekan Kami</h3>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {developers.data.data.map((dev) => (
            <Image
              key={dev.name}
              src={env.NEXT_PUBLIC_S3_ENDPOINT + dev.logo_path}
              alt={dev.name}
              width={576}
              height={576}
              className="w-full h-20 lg:h-40 border p-2 object-contain aspect-square rounded "
            />
          ))}
        </div>
      </div>
    );
  }

  return <></>;
};

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="container mx-auto flex flex-col gap-8 p-4 sm:px-0">
          <Hero />
          <PopularProperties />
          <Partners />
          <Developers />
          <Faq defaultTab="PRIMEPRO" />
        </div>
        <VideoThumbnail />
      </div>
    </>
  );
};

export default HomePage;
