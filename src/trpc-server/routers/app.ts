import { procedure, router } from "../trpc";
import prisma from "@/lib/prismaClient";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { authSchema } from "@/lib/validations/auth";
import { emailSchema } from "@/lib/validations/email";

import { productIdSchema, uploadProductSchema } from "@/lib/validations/product";
import { z } from "zod";

export const appRouter = router({
  getAllProducts: procedure.query(async (opts) => {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
        subCategories: true,
      },
    });
    return products;
  }),
  getProductById: procedure.input(productIdSchema).query(async (opts) => {
    const product = await prisma.product.findUnique({
      where: { id: opts.input.id },
      include: {
        categories: true,
        subCategories: true,
      },
    });
    return product;
  }),
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
  productUpload: procedure
    .input(uploadProductSchema)
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
      try {
        let categories = await prisma.categories.findUnique({
          where: { name: category.toLowerCase() },
        });

        if (!categories) {
          categories = await prisma.categories.create({
            data: {
              name: category,
              slug: category.toLowerCase(),
            },
          });
        }

        let subCategories = await prisma.subCategories.findUnique({
          where: { name: subCategory.toLowerCase() },
        });

        if (!subCategories) {
          subCategories = await prisma.subCategories.create({
            data: {
              name: subCategory,
              slug: subCategory.toLowerCase(),
              categoryName: category,
            },
          });
        }
        await prisma.product.create({
          data: {
            name,
            description,
            price,
            quantity,
            categoryName: category,
            subCategoryName: subCategory,
            images,
            slug: name.toLowerCase(),
            rating: 0,
          },
        });
        console.log("done!");
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(err);
        }
        console.log(err);
      }
      return "ok";
    }),
});

export type AppRouter = typeof appRouter;
