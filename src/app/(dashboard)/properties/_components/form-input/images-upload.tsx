"use client";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyImage, PropertyImageTag } from "@/lib/enums/property-image";
import { Button } from "@/components/ui/button";
import { LuTag, LuUpload } from "react-icons/lu";
import Image from "next/image";
import { env } from "@/lib/env";
import { useStore } from "../../_stores";
import { useShallow } from "zustand/react/shallow";
import { ImagesMenu } from "./images-menu";
import { MdStar } from "react-icons/md";
import { FaStarOfLife } from "react-icons/fa";

export const ImagesUpload = () => {
  const { images, setStore } = useStore(
    useShallow((state) => ({ images: state.images, setStore: state.setStore })),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetAsCoverClick = (
    newImageIndex: number,
    newImage: PropertyImage,
  ) => {
    const oldCover = images.find((img) => img.is_cover);
    if (oldCover) {
      const oldCoverIndex = images.indexOf(oldCover);
      const newImages = [...images];
      newImages.splice(oldCoverIndex, 1, { ...oldCover, is_cover: false });
      newImages.splice(newImageIndex, 1, { ...newImage, is_cover: true });
      setStore("images", newImages);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const limitedFiles = files.slice(0, 8 - images.length);
      const newUploadedImages: PropertyImage[] = limitedFiles.map(
        (file, index) => {
          return {
            is_cover: images.length === 0 && index === 0,
            object_url: URL.createObjectURL(file),
            name: file.name,
            path: "",
            english_label: "",
            indonesian_label: "",
            file,
          };
        },
      );
      const newImages = [...images, ...newUploadedImages];
      setStore("images", newImages);
      return;
    }
  };

  const onDeleteClick = (index: number) => {
    // Revoke the URL to prevent memory leaks
    if (images[index].object_url) {
      URL.revokeObjectURL(images[index].object_url);
    }
    const newImages = [...images];
    newImages.splice(index, 1);
    setStore("images", newImages);
  };

  const onTagClick = (index: number, tag: PropertyImageTag) => {
    const newPropertyImage = { ...images[index], ...tag };
    const newImages = [...images];
    newImages.splice(index, 1, newPropertyImage);
    setStore("images", newImages);
  };

  return (
    <div className="grid gap-4 md:flex md:flex-col">
      <h3 className="text-lg">PROPERTY IMAGES</h3>
      <div className="grid gap-2 md:flex md:flex-col">
        <Label className="images flex gap-1">
          Upload Gambar (Min 3, Max 8)
          <FaStarOfLife size={6} className="text-red-500" />
        </Label>
        <span className="text-muted-foreground flex flex-wrap text-xs">
          Cover image akan bertanda <MdStar className="text-yellow-500" />
        </span>
        <Button
          type="button"
          size="sm"
          disabled={images.length === 8}
          className="w-fit"
          onClick={() => inputRef?.current?.click()}
        >
          <LuUpload />
          {images.length === 8 ? "Disabled: 8 pictures reached" : "Pilih file"}
        </Button>
        <Input
          type="file"
          multiple
          name="images"
          id="images"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleAdditionalImagesChange}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={`image-${index}`}
              className="relative rounded overflow-hidden border w-full h-32"
            >
              {image.is_cover && (
                <span className="top-0 left-0 absolute w-6 h-6 flex items-center justify-center bg-background rounded">
                  <MdStar className="text-yellow-500" />
                </span>
              )}
              <ImagesMenu
                propertyImage={image}
                onSetAsCoverClick={() => handleSetAsCoverClick(index, image)}
                onDeleteClick={() => onDeleteClick(index)}
                onTagClick={(tag) => onTagClick(index, tag)}
              />
              <Image
                src={
                  image.object_url
                    ? image.object_url
                    : `${env.NEXT_PUBLIC_S3_ENDPOINT}${image.path}`
                }
                alt={image.english_label}
                width={100}
                height={100}
                className="w-full h-full rounded"
              />
              <span className="absolute right-0 bottom-0 text-xs bg-background text-foreground px-2 py-1 rounded flex gap-1 items-center">
                <LuTag />
                {image.indonesian_label ? image.indonesian_label : "Missing"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
