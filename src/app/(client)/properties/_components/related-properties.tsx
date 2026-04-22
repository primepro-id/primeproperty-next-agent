"use client";
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
import { useQuery } from "@tanstack/react-query";
import { bookmarkedPropertyOptions } from "@/hooks/local-storage/bookmark";
import { useRelatedProperties } from "@/hooks";

type RelatedPropertiesProps = {
  propertyId: number;
};

export const RelatedProperties = ({ propertyId }: RelatedPropertiesProps) => {
  const bookmarkedProperties = useQuery(bookmarkedPropertyOptions());
  const relatedProperties = useRelatedProperties(propertyId);
  if (
    relatedProperties?.data?.data &&
    relatedProperties?.data?.data.length > 0
  ) {
    const jsonLd = createPropertiesSchema(relatedProperties?.data.data, {});

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
            <h3>PROPERTI TERKAIT</h3>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {relatedProperties.data.data.map((propertyWithAgent, index) => (
              <CarouselItem
                key={`${index}_related_properties`}
                className="basis-4/5 md:basis-1/2 lg:basis-1/3"
              >
                <PropertyCard
                  propertyWithAgent={propertyWithAgent}
                  bookmarkedProperties={bookmarkedProperties.data}
                  onBookmarkClickAction={() => bookmarkedProperties.refetch()}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </>
    );
  }

  return <></>;
};
