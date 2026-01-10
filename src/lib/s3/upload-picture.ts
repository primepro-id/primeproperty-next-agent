"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3_PROPERTY_BUCKET, s3client } from "./s3-client";

export const uploadPicture = async (
  imageKey: string,
  formData: FormData,
  formDataName?: string,
): Promise<string | null> => {
  const picture = formData.get(formDataName ?? "picture") as File;

  try {
    const buffer = Buffer.from(await picture.arrayBuffer());
    const command = new PutObjectCommand({
      Bucket: S3_PROPERTY_BUCKET,
      Key: imageKey,
      Body: buffer,
      ACL: "public-read",
    });
    const upload = await s3client.send(command);
    const picturePath = upload.ETag
      ? `/${S3_PROPERTY_BUCKET}/${imageKey}`
      : null;

    // Warning: Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.
    return picturePath;
  } catch (e) {
    console.error(`Error in S3 ${S3_PROPERTY_BUCKET} bucket upload:`, e);
    return null;
  }
};
