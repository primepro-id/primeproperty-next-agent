"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PropertyImage } from "../enums/property-image";
import { S3_PROPERTY_BUCKET, s3client } from "./s3-client";

export const uploadPropertyImages = async (
  propertyImages: PropertyImage[],
  formData: FormData,
): Promise<PropertyImage[]> => {
  const files = formData.getAll("images") as File[];

  try {
    const time = new Date().getTime();
    const uploadPromises = propertyImages.map(async (img, index) => {
      if (img.object_url) {
        const file = files.find((file) => file.name === img.name);
        console.log(index, file);
        if (file) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const key = `${time}-${index}`;
          const path = `/${S3_PROPERTY_BUCKET}/${key}`;

          const command = new PutObjectCommand({
            Bucket: S3_PROPERTY_BUCKET,
            Key: key,
            Body: buffer,
            ACL: "public-read",
          });

          const upload = await s3client.send(command);
          console.log(path, upload);
          return {
            ...img,
            path: upload.ETag ? path : "",
          };
        }
        return img;
      } else {
        return img;
      }
    });

    const promises = await Promise.all(uploadPromises);
    return promises.filter((prom) => prom.path !== "");
  } catch (error) {
    console.error("Error uploading property images:", error);
    return [];
  }
};
