"use server";

import prisma from "@/lib/prismaClient";

export const filterProductsAction = async (query: string) => {
  const data = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      },
    },
  });
  return data;
};
