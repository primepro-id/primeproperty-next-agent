"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import React, { useState } from "react";
import { PropertyCarousel } from "./property-carousel";
import { PropertyDialogCarousel } from "./property-dialog-carousel";

type PropertyImagesProps = {
  propertyWithAgent: PropertyWithAgent;
};

export const PropertyImages = ({ propertyWithAgent }: PropertyImagesProps) => {
  const [dialogCarouselindex, setDialogCarouselIndex] = useState<number | null>(
    null,
  );
  return (
    <div>
      <PropertyCarousel
        propertyWithAgent={propertyWithAgent}
        onImageClick={(imgIndex) => setDialogCarouselIndex(imgIndex)}
      />
      <Dialog
        open={dialogCarouselindex !== null ? dialogCarouselindex >= 0 : false}
      >
        <DialogContent
          className="max-w-7xl z-[60] border border-primary"
          overlayClassName="z-[60]"
          onEscapeKeyDown={() => setDialogCarouselIndex(null)}
          onOverlayClick={() => setDialogCarouselIndex(null)}
        >
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />
          <PropertyDialogCarousel
            onCloseClick={() => setDialogCarouselIndex(null)}
            startIndex={dialogCarouselindex !== null ? dialogCarouselindex : 0}
            propertyWithAgent={propertyWithAgent}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
