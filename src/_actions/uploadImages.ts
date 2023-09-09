"use server";

import { FileWithPreview } from "@/types";
import { BlobServiceClient } from "@azure/storage-blob";
import { nanoid } from "nanoid";

export async function uploadImages(formDataa: FormData) {
  const formData = Object.fromEntries(formDataa);
  const files: any[] = [];

  for (let i = 0; i <= 5; i++) {
    const fieldName = `files${i}`;
    if (formData[fieldName]) {
      files.push(formData[fieldName]);
    }
  }

  async function uploadFilesAndGetLinks(files: FileWithPreview[]) {
    const linkPromises = files.map(async (file) => {
      if (file) {
        return await uploadFile(file);
      }
    });

    const links = await Promise.all(linkPromises);

    return links.filter((link) => link !== undefined); // Filter out undefined values
  }

  const links = await uploadFilesAndGetLinks(files);
  return links;
}

export async function uploadFile(file: any) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZ_ACCOUNT ?? "",
  );
  const containerClient = blobServiceClient.getContainerClient("ecommerce");

  const blobName = `${nanoid()}-${file.name}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const buffer = new Uint8Array(await file.arrayBuffer()) as any;
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: file.type },
  });
  return blockBlobClient.url;
}
