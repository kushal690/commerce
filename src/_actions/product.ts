"use server";

import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export const filterProductsAction = async (query: string) => {
  const data = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  return data;
};

interface GetProductsActionProps {
  sort: string | null;
  offset: number | null;
  limit: number | null;
  categories: string[] | null;
  subcategories: string[] | null;
  price_range: string[] | null;
}

export const getProductsAction = async ({
  sort,
  offset,
  limit,
  categories,
  subcategories,
  price_range
}: GetProductsActionProps) => {
  const items = await prisma.product.findMany({
    skip: offset ?? 0,
    take: limit ?? 10,
    orderBy: getSort(sort ?? "date.desc"),
    where: {
      categoryName: {
        in: categories ?? undefined,
      },
      subCategoryName: {
        in: subcategories ?? undefined,
      },
      price: {
        gte: price_range ? Number(price_range[0]) : undefined,
        lte: price_range ? Number(price_range[1]) : undefined,
      }
    },
  });
  const count = await prisma.product.count({
    where: {
      categoryName: {
        in: categories ?? undefined,
      },
      subCategoryName: {
        in: subcategories ?? undefined,
      },
      price: {
        gte: price_range ? Number(price_range[0]) : undefined,
        lte: price_range ? Number(price_range[1]) : undefined,
      }
    },
  });
  return {
    items,
    count,
  };
};

function getSort(sort: string): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case "date.asc":
      return { id: "asc" };
    case "date.desc":
      return { id: "desc" };
    case "price.asc":
      return { price: "asc" };
    case "price.desc":
      return { price: "desc" };
    case "name.asc":
      return { name: "asc" };
    case "name.desc":
      return { name: "desc" };
    default:
      return {};
  }
}
