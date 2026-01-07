"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";
import { uploadPicture } from "@/lib/s3";
import { updateDeveloper } from "@/lib/api/developers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { LogoInput } from "../../_components/logo-input";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { findDeveloperByIdOptions } from "@/hooks/developers";
import { env } from "@/lib/env";

type EditDeveloperFormProps = {
  id: string;
};

export const EditDeveloperForm = ({ id }: EditDeveloperFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useQuery(findDeveloperByIdOptions(id));

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const logo = formData.get("logo") as File;

    try {
      if (!name) {
        toast.error("Please enter a name");
        return;
      }

      let uploadedPicturePath = data?.data?.logo_path ?? null;
      if (logo.size > 0) {
        uploadedPicturePath = await uploadPicture(
          name.toLowerCase().replaceAll(" ", "-"),
          formData,
          "logo",
        );
      }

      if (!uploadedPicturePath && !data?.data?.logo_path) {
        toast.error("Failed to upload logo, please reupload");
        return;
      }

      const developer = await updateDeveloper(
        String(data?.data?.id),
        uploadedPicturePath,
        name.trim(),
      );
      if (developer.status === 200) {
        toast.success("Developer updated successfully");
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!data?.data) {
    return <div>Developer not found!</div>;
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-lg"
      action={(formData) =>
        startTransition(async () => await handleAction(formData))
      }
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="profile_picture">Logo (recommended .png)</Label>
        <LogoInput
          defaultUrl={env.NEXT_PUBLIC_S3_ENDPOINT + data?.data?.logo_path}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder={data?.data?.name}
          defaultValue={data?.data?.name}
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
              Saving
            </span>
          ) : (
            "SAVE"
          )}
        </Button>
      </div>
    </form>
  );
};
