"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";
import { uploadPicture } from "@/lib/s3";
import { createDeveloper } from "@/lib/api/developers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { LogoInput } from "../../_components/logo-input";
import { useRouter } from "next/navigation";

export const CreateDeveloperForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const logo = formData.get("logo") as File;

    try {
      if (!name) {
        toast.error("Please enter a name");
        return;
      }

      let uploadedPicturePath = null;
      if (logo.size > 0) {
        uploadedPicturePath = await uploadPicture(
          name.toLowerCase().replaceAll(" ", "-"),
          formData,
          "logo",
        );
      } else {
        toast.error("Please upload a logo");
        return;
      }

      if (!uploadedPicturePath) {
        toast.error("Failed to upload logo, please reupload");
        return;
      }

      const developer = await createDeveloper(uploadedPicturePath, name.trim());
      if (developer.status === 201) {
        toast.success("Developer added successfully");
        router.push("/developers");
      } else if (developer.status === 400) {
        toast.error(developer.message);
      }
      return;
    } catch (error) {
      console.error(error);
      toast.error("Server error, please try again later");
      return;
    }
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-lg"
      action={(formData) =>
        startTransition(async () => await handleAction(formData))
      }
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile_picture">Logo (recommended .png)</Label>
        <LogoInput />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Padepokan Merpati Putih"
          required
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
          disabled={isPending}
          className="flex-1 w-[33.3%] max-w-[50%] ml-auto"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <LuLoader className="animate-spin" />
              Processing
            </span>
          ) : (
            "ADD"
          )}
        </Button>
      </div>
    </form>
  );
};
