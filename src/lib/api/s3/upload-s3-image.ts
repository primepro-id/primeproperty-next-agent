import { JsonApiResponse } from "../fetch-api";
import { PropertyImage } from "@/lib/enums/property-image";
import { getAccessToken } from "@/lib/cookie/get-access-token";
import { env } from "@/lib/env";

export const uploadS3Images = async (
  files: File[] | null,
  token?: string,
): Promise<JsonApiResponse<PropertyImage[]> | undefined> => {
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
        "x-access-token": token ?? (await getAccessToken()),
      },
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.error("[uploadS3Images] ERROR", error);
  }
};
