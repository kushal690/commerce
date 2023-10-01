import { procedure, router } from "../trpc";
import prisma from "@/lib/prismaClient";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { authSchema } from "@/lib/validations/auth";
import { emailSchema } from "@/lib/validations/email";
import {
  filterProductsSchema,
  productIdSchema,
  uploadProductSchema,
} from "@/lib/validations/product";
import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import NewsletterWelcomeEmail from "@/components/emails/newsletter-welcome-email"
import { renderdedNewsletterWelcomeEmail } from "@/components/emails/renderedEmail";

export const appRouter = router({
  getAllProducts: procedure.input(filterProductsSchema).query(async (opts) => {
    const products = await prisma.product.findMany({
      take: opts.input?.take ?? undefined,
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
    
      const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      })

      const options = {
        from: process.env.SMTP_USER,
        to: opts.input.email,
        subject: 'Blitz Newsletter Welcome Email',
        html: renderdedNewsletterWelcomeEmail(opts.input.email, process.env.SMTP_FROM as string)
      };

      await transporter.sendMail(options)


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
      console.log(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while subscribing to newsletter",
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
      } = input;
    const images = input.images as string[]
      try {
        const [categories, subCategories] = await Promise.all([
          prisma.categories.upsert({
            where: { name: category.toLowerCase() },
            update: {},
            create: {
              name: category,
              slug: category.toLowerCase(),
            },
          }),
          prisma.subCategories.upsert({
            where: { name: subCategory.toLowerCase() },
            update: {},
            create: {
              name: subCategory,
              slug: subCategory.toLowerCase(),
              categoryName: category,
            },
          }),
        ]);

        await prisma.product.create({
          data: {
            name,
            description,
            price,
            quantity,
            categoryName: categories.name,
            subCategoryName: subCategories.name,
            images ,
            slug: name.toLowerCase(),
            rating: 0,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(err);
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while creating product",
        });
      }
      return "ok";
    }),
});

export type AppRouter = typeof appRouter;


