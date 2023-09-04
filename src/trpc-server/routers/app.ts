
import { procedure, router } from "../trpc";
import prisma from "@/lib/prismaClient";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { authSchema } from "@/lib/validations/auth";
import { emailSchema } from "@/lib/validations/email";
import { BlobServiceClient } from "@azure/storage-blob";
import { nanoid } from "nanoid";
import { uploadProductSchema } from "@/lib/validations/product";

export const appRouter = router({
  newsletterSignup: procedure.input(emailSchema).mutation(async (opts) => {
    try {
      await prisma.newsletter.create({
        data: {
          email: opts.input.email,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You are already subscribed to our newsletter.",
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while subcribing to newsletter",
      });
    }
  }),
  signUp: procedure.input(authSchema).mutation(async (opts) => {
    const hashedPassword = await hash(opts.input.password, 12);
    try {
      await prisma.user.create({
        data: {
          email: opts.input.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists",
        });
      }
      console.log("Error while signup creating account prisma error: " + error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while creating account",
      });
    }
  }),
  productUpload: procedure.input(uploadProductSchema)

    .mutation(async ({ input }) => {
      const {
        name,
        description,
        price,
        quantity,
        category,
        subCategory,
        images,

      } = input;
      console.log(images);
      return "ok";
    }),
});

export type AppRouter = typeof appRouter;

export async function uploadImage(image: any) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZ_ACCOUNT ?? "",
  );
  const containerClient = blobServiceClient.getContainerClient("ecommerce");

  const blobName = nanoid() + image.name;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const buffer = new Uint8Array(await image.arrayBuffer()) as any;
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: image.type },
  });
  return blockBlobClient.url;
}
