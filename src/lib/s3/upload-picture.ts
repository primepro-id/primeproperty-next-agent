"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3_PROPERTY_BUCKET, s3client } from "./s3-client";

export const uploadPicture = async (
  imageKey: string,
  formData: FormData,
  formDataName?: string,
): Promise<string | null> => {
  const picture = formData.get(formDataName ?? "picture") as File;

  const imagePath = `/${S3_PROPERTY_BUCKET}/${imageKey}`;
  try {
    const buffer = Buffer.from(await picture.arrayBuffer());
    const command = new PutObjectCommand({
      Bucket: S3_PROPERTY_BUCKET,
      Key: imageKey,
      Body: buffer,
      ACL: "public-read",
    });
    await s3client.send(command);

    // Warning: Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.
    return imagePath;
  } catch (e) {
    console.error(`Error in S3 ${S3_PROPERTY_BUCKET} bucket upload:`, e);
    return null;
  }
};
