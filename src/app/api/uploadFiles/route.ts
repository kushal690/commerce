import { isArrayOfFile } from "@/lib/utils";
import { uploadImage } from "@/trpc-server/routers/app";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = Object.fromEntries(await request.formData());
  const { files0, files1, files2, files3, files4, files5 } = formData;

  const files = [files0, files1, files2, files3, files4, files5];

  async function uploadFilesAndGetLinks(files) {
    const linkPromises = files.map(async (file) => {
      if (file) {
        return await uploadImage(file);
      }
    });

    const links = await Promise.all(linkPromises);

    return links.filter((link) => link !== undefined); // Filter out undefined values
  }

  const links = await uploadFilesAndGetLinks(files);

  return NextResponse.json({ imagelinks: links });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
