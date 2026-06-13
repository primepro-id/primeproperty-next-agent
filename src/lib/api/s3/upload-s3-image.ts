"use client";
import { JsonApiResponse } from "../fetch-api";
import { PropertyImage } from "@/lib/enums/property-image";
import { getAccessToken } from "@/lib/cookie/get-access-token";
import { env } from "@/lib/env";
export const uploadS3Images = async (
  files: File[] | null,
): Promise<JsonApiResponse<PropertyImage[]> | undefined> => {
  console.log("[uploadS3Images]");
  if (!files) {
    return undefined;
  }
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const res = await fetch(env.NEXT_PUBLIC_API_URL + `/s3/images`, {
      headers: {
        "x-access-token": await getAccessToken(),
      },
      method: "POST",
      body: formData,
    });
    console.log("[uploadS3Images] SUCCESS:");
    return await res.json();
  } catch (error) {
    console.error("[uploadS3Images] ERROR", error);
  }
};
