import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import {
  BankSelect,
  BuildingCertificateSelect,
  BuildingConditionSelect,
  BuildingFurnitureSelect,
  BuildingTypeSelect,
  CurrencySelect,
  DescriptionInput,
  DeveloperSelect,
  FacilitiesSelect,
  ImagesUpload,
  LocationInput,
  PriceInput,
  PurchaseStatusSelect,
  SoldChannelSelect,
  SoldStatusSelect,
  StreetInput,
  TitleInput,
} from "../../_components";
import { GmapIframeInput } from "../../_components/form-input/gmap_iframe_input";
import { Measurements } from "../../_components/form-input/measurements";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuChevronLeft } from "react-icons/lu";
import { useStore } from "../../_stores";
import { useShallow } from "zustand/react/shallow";
import {
  converPropertyFormDataToApiData,
  PropertyApiSchema,
  PropertyFormData,
} from "../../_libs";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { uploadPropertyImages } from "@/lib/s3/upload-property-images";
import { updateProperty } from "@/lib/api/properties/update-property";
import { AgentRole } from "@/lib/api/agents/type";
import { useState } from "react";
import { CurrencyUnit } from "@/lib/api/properties/type";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RentTimeSelect } from "../../_components/form-input/rent-time-select";
import { PriceDownPaymentInput } from "../../_components/form-input/price-down-payment";

type EditPropertyFormProps = {
  userRole?: AgentRole;
  propertyWithAgent: PropertyWithAgent;
};

const SeoForm = ({ propertyWithAgent }: EditPropertyFormProps) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg">SEO</h3>
      <TitleInput defaultValue={propertyWithAgent[0].title} />
      <DescriptionInput defaultValue={propertyWithAgent[0].description} />
      <div className="grid md:grid-cols-3 gap-4">
        <LocationInput
          defaultProvinceValue={propertyWithAgent[0].province}
          defaultRegencyValue={propertyWithAgent[0].regency}
        />
        <StreetInput defaultValue={propertyWithAgent[0].street} />
      </div>
    </div>
  );
};

const PriceForm = ({ propertyWithAgent }: EditPropertyFormProps) => {
  const [isRent, setIsRent] = useState(
    propertyWithAgent[0].purchase_status === PurchaseStatus.ForRent,
  );
  const [currency, setCurrency] = useState(CurrencyUnit.IDR);
  return (
    <div className="grid gap-4 md:flex md:flex-col">
      <h3 className="text-lg">PRICE</h3>
      <div className="grid grid-cols-2 gap-4">
        <PurchaseStatusSelect
          defaultValue={propertyWithAgent[0].purchase_status}
          onValueChange={(val) => setIsRent(val === PurchaseStatus.ForRent)}
        />
        <RentTimeSelect
          disabled={!isRent}
          defaultValue={propertyWithAgent[0].rent_time}
        />
        <PriceInput
          currency={currency}
          defaultValue={propertyWithAgent[0].price}
        />
        <PriceDownPaymentInput
          currency={currency}
          defaultValue={propertyWithAgent[0].price_down_payment}
        />
        <CurrencySelect
          onValueChange={setCurrency}
          defaultValue={propertyWithAgent[0].currency}
        />
      </div>
    </div>
  );
};

const DetailForm = ({ propertyWithAgent, userRole }: EditPropertyFormProps) => {
  return (
    <div className="grid gap-4 md:flex md:flex-col">
      <h3 className="text-lg">PROPERTY DETAILS</h3>
      <div className="grid grid-cols-2 gap-4">
        <BuildingTypeSelect defaultValue={propertyWithAgent[0].building_type} />
        <BuildingConditionSelect
          defaultValue={propertyWithAgent[0].building_condition}
        />
        <BuildingCertificateSelect
          defaultValue={propertyWithAgent[0].building_certificate}
        />
        <BuildingFurnitureSelect
          defaultValue={
            propertyWithAgent[0].building_furniture_capacity ?? undefined
          }
        />
        <SoldStatusSelect defaultValue={propertyWithAgent[0].sold_status} />
        {userRole === AgentRole.Admin && (
          <SoldChannelSelect
            defaultValue={propertyWithAgent[0].sold_channel ?? undefined}
          />
        )}
        {userRole === AgentRole.Admin && (
          <>
            <DeveloperSelect
              defaultValue={String(propertyWithAgent[0].developer_id ?? 0)}
            />
            <BankSelect
              defaultValue={String(propertyWithAgent[0].bank_id ?? 0)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const EditPropertyForm = ({
  userRole,
  propertyWithAgent,
}: EditPropertyFormProps) => {
  const queryClient = useQueryClient();
  const { facilities, images, setStore, loadingText } = useStore(
    useShallow((state) => ({
      facilities: state.selectedFacilities,
      images: state.images,
      setStore: state.setStore,
      loadingText: state.loadingText,
    })),
  );

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
      const property = await updateProperty(
        propertyWithAgent[0].id,
        propertyApiData,
      );
      if (property.status !== 200) {
        toast.error("Error: please check your input and try again");
        return;
      }

      uploadedImages.forEach((img) => {
        if (img.object_url) URL.revokeObjectURL(img.object_url);
      });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property updated successfully");
      return;
    } catch (error) {
      console.error(error);
      toast.error("Error: please check your input and try again");
    } finally {
      setStore("loadingText", "");
    }
  };

  return (
    <form className="grid gap-4 container mx-auto" action={handleAction}>
      <div className="grid gap-8 md:grid-cols-2">
        <SeoForm propertyWithAgent={propertyWithAgent} />
        <PriceForm propertyWithAgent={propertyWithAgent} />
        <Measurements propertyWithAgent={propertyWithAgent} />
        <DetailForm userRole={userRole} propertyWithAgent={propertyWithAgent} />
        <div className="md:order-last">
          <ImagesUpload />
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg">ADDITIONAL DETAILS</h3>
          <div className="grid gap-4">
            <FacilitiesSelect />
            <GmapIframeInput defaultValue={propertyWithAgent[0].gmap_iframe} />
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
          {loadingText ? loadingText : "Save"}
        </Button>
      </div>
    </form>
  );
};
