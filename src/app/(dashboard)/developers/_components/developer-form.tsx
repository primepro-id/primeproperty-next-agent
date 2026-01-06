"use client";
import { Label } from "@/components/ui/label";
import { PictureInput } from "./picture-input";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";
import { useStore } from "../_stores/use-store";
import { toast } from "react-toastify";
import { uploadPicture } from "@/lib/s3";
import { createDeveloper, findDeveloperBySlug } from "@/lib/api/developers";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const DeveloperForm = () => {
  const { name, setStore, loadingText, resetStore } = useStore();

  const handleAction = async (formData: FormData) => {
    const newName = formData.get("name") as string;
    const picture = formData.get("picture") as File;

    try {
      if (!newName) {
        toast.error("Please enter a name");
        return;
      }

      if (picture.size === 0) {
        toast.error("Please upload a picture");
        return;
      }

      const slug = newName.trim().toLowerCase().replaceAll(" ", "-");
      const previousDev = await findDeveloperBySlug(slug);
      if (previousDev.data?.id) {
        toast.error("Developer with the same name already exists");
        return;
      }

      let uploadedPicturePath = null;
      if (picture.size > 0) {
        setStore("loadingText", "Uploading picture...");
        uploadedPicturePath = await uploadPicture(
          newName.toLowerCase().replaceAll(" ", "-"),
          formData,
        );
      }

      if (!uploadedPicturePath) {
        toast.error("Failed to upload picture");
        return;
      }

      const developer = await createDeveloper(
        uploadedPicturePath,
        newName.trim(),
      );
      if (developer.status === 201) {
        toast.success("Developer added successfully");
        resetStore();
      } else if (developer.status === 400) {
        toast.error(developer.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error, please try again later");
    } finally {
      setStore("loadingText", "");
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-lg" action={handleAction}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile_picture">Logo (recommended .png)</Label>
        <PictureInput />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Padepokan Merpati Putih"
          required
          value={name}
          onChange={(e) => setStore("name", e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/developers"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
        <Button
          type="submit"
          disabled={loadingText !== ""}
          className="flex-1 w-[33.3%] max-w-[50%] ml-auto"
        >
          {loadingText !== "" ? (
            <span className="flex items-center gap-2">
              <LuLoader className="animate-spin" />
              {loadingText}
            </span>
          ) : (
            "ADD"
          )}
        </Button>
      </div>
    </form>
  );
};
