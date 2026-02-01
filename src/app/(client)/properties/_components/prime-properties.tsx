import { findProperties } from "@/lib/api/properties/find-properties";
import { PropertyCard } from "./card";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createPropertiesSchema } from "@/lib/schema/create-properties-schema";

export const PrimeProperties = async () => {
  const properties = await findProperties({ is_prime: "true", limit: "10" });
  if (properties.data?.data && properties.data?.data.length > 0) {
    const jsonLd = createPropertiesSchema(properties?.data.data, {});
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Carousel>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">Properti Prime</h3>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {properties.data.data.map((propertyWithAgent, index) => (
              <CarouselItem
                key={`${index}_popular_properties`}
                className="basis-4/5 md:basis-1/2 lg:basis-1/3"
              >
                <PropertyCard propertyWithAgent={propertyWithAgent} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </>
    );
  }

  return <></>;
};
