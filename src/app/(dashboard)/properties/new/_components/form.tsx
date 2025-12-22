"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DescriptionInput,
  TitleInput,
  StreetInput,
  PriceInput,
  PurchaseStatusSelect,
  BuildingTypeSelect,
  BuildingConditionSelect,
  BuildingFurnitureSelect,
  BuildingCertificateSelect,
  FacilitiesSelect,
  ImagesUpload,
  CurrencySelect,
} from "../../_components";
import { GmapIframeInput } from "../../_components/form-input/gmap_iframe_input";
import { LocationInput } from "../../_components/form-input/location-input";
import { Measurements } from "../../_components/form-input/measurements";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import { cn } from "@/lib/utils";
import {
  converPropertyFormDataToApiData,
  PropertyApiSchema,
  PropertyFormData,
} from "../../_libs";
import { useStore } from "../../_stores";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { createProperty } from "@/lib/api/properties/create-property";
import { uploadPropertyImages } from "@/lib/s3/upload-property-images";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RentTimeSelect } from "../../_components/form-input/rent-time-select";
import { useState } from "react";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { CurrencyUnit } from "@/lib/api/properties/type";
import { DescriptionSeoInput } from "../../_components/form-input/description-seo";
import { PriceDownPaymentInput } from "../../_components/form-input/price-down-payment";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";

const SeoForm = () => {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg">SEO</h3>
      <TitleInput />
      <DescriptionInput />
      <DescriptionSeoInput />
      <div className="grid md:grid-cols-3 gap-6 md:gap-4">
        <LocationInput />
        <StreetInput />
      </div>
    </div>
  );
};

const PriceForm = () => {
  const [isRent, setIsRent] = useState(false);
  const [currency, setCurrency] = useState(CurrencyUnit.IDR);
  return (
    <div className="grid gap-4 md:flex md:flex-col">
      <h3 className="text-lg">PRICE</h3>
      <div className="grid grid-cols-2 gap-4">
        <PurchaseStatusSelect
          onValueChange={(val) => setIsRent(val === PurchaseStatus.ForRent)}
        />
        <RentTimeSelect disabled={!isRent} />
        <PriceInput currency={currency} />
        <PriceDownPaymentInput currency={currency} />
        <CurrencySelect onValueChange={setCurrency} />
      </div>
    </div>
  );
};

const DetailForm = () => {
  return (
    <div className="grid gap-4 md:flex md:flex-col">
      <h3 className="text-lg">PROPERTY DETAILS</h3>
      <div className="grid grid-cols-2 gap-4">
        <BuildingTypeSelect />
        <BuildingConditionSelect />
        <BuildingCertificateSelect />
        <BuildingFurnitureSelect />
      </div>
    </div>
  );
};

export const NewPropertyForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { facilities, images, setStore, loadingText } = useStore(
    useShallow((state) => ({
      facilities: state.selectedFacilities,
      images: state.images,
      setStore: state.setStore,
      loadingText: state.loadingText,
    })),
  );

  useQuery({
    queryKey: ["new-property"],
    queryFn: async () => {
      setStore("selectedFacilities", []);
      setStore("images", []);
      return [];
    },
  });

  const handleAction = async (formData: FormData) => {
    const dataEntry = Object.fromEntries(formData) as PropertyFormData;
    if (dataEntry.gmap_iframe && !dataEntry.gmap_iframe.includes("iframe")) {
      toast.error("Invalid Google Map iframe URL");
      return;
    }
    const propertyApiData = converPropertyFormDataToApiData(
      dataEntry,
      facilities,
      images,
    );
    try {
      if (images.length < 3) {
        toast.error("Minimum 3 gambar");
        return;
      }
      const schemaValidation = PropertyApiSchema.safeParse(propertyApiData);
      if (!schemaValidation.success) {
        const errorMsg = schemaValidation.error.errors[0].message;
        toast.error(errorMsg);
        return;
      }

      setStore("loadingText", "Uploading images...");
      const uploadedImages = await uploadPropertyImages(images, formData);
      if (uploadedImages.length === 0) {
        toast.error("Failed to upload images, contact admin immediately!");
        return;
      }

      setStore("loadingText", "Creating property...");
      propertyApiData.images = uploadedImages;
      const property = await createProperty(propertyApiData);
      if (property.status !== 201) {
        toast.error("Error: please check your input and try again");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property created successfully, redirecting...");
      setTimeout(() => {
        router.push(
          `${env.NEXT_PUBLIC_CLIENT_URL}/properties/${property?.data?.id}`,
        );
      }, 1000);
      return;
    } catch (error) {
      console.error(error);
      toast.error("Error: please check your input and try again");
    } finally {
      setStore("loadingText", "");
    }
  };

  return (
    <form
      className="container mx-auto grid gap-4 md:gap-8"
      action={handleAction}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <SeoForm />
        <PriceForm />
        <Measurements />
        <DetailForm />
        <div className="md:order-last">
          <ImagesUpload />
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg">ADDITIONAL DETAILS</h3>
          <div className="grid gap-4">
            <FacilitiesSelect />
            <GmapIframeInput />
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full border" />
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <LuChevronLeft />
          Back
        </Link>
        <Button
          type="submit"
          className={cn(
            "w-fit ml-auto",
            loadingText !== "" && "animate-bounce",
          )}
          disabled={loadingText !== ""}
        >
          {loadingText ? loadingText : "Buat Properti"}
        </Button>
      </div>
      <div className="ml-auto text-right">
        <span className="text-red-500">*</span>
        <span className="text-xs">
          Harap menunggu hingga popup sukses keluar sebelum meninggalkan halaman
        </span>
      </div>
    </form>
  );
};
