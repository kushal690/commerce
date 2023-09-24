"use server";

import prisma from "@/lib/prismaClient";
import { cartItemSchema } from "@/lib/validations/cart";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const addToCartAction = async (
  input: z.infer<typeof cartItemSchema>,
) => {
  const product = await prisma.product.findFirst({
    where: {
      id: input.productId,
    },
  });

  if (!product) throw new Error("Product not found, please try again later.");

  if (product!.quantity < input.quantity)
    throw new Error("Product is out of stock, please try again later.");

  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || cartId.length !== 24) {
    const cart = await prisma.cart.create({
      data: {},
    });
    cookieStore.set("cartId", cart.id);
    revalidatePath("/");
  }

  const cart = await prisma.cart.findFirst({
    where: { id: cartId },
    select: {
      id: true,
      items: true,
    },
  });

  if (!cart) {
    cookieStore.set({
      name: "cartId",
      value: "",
      expires: new Date(0),
    });

    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    throw new Error("Cart not found, please try again.");
  }

  const cartItem = cart.items.find(
    (item) => item.productId === input.productId,
  );

  if (cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + input.quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: input.productId,
        quantity: input.quantity,
      },
    });
  }
  revalidatePath("/");
};

export const getCartAction = async () => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (!cartId || cartId.length !== 24) return;
  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      _count: {
        select: {
          items: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!cart) return;
  return { count: cart._count.items, items: cart.items };
};

export const updateCartItemAction = async (input: z.infer<typeof cartItemSchema>) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (!cartId || cartId.length !== 24) return;
  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });
  if (!cart) return;
  const cartItem = cart.items.find((item) => item.productId === input.productId);
  if (!cartItem) return;


  await prisma.cartItem.update({
    where: {
      id: cartItem.id,
    },
    data: {
      quantity: input.quantity,
    },
  });
  revalidatePath("/");
}

export const deleteCartItemAction = async (itemId: string) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (!cartId || cartId.length !== 24) return;
  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });
  if (!cart) return;
  const cartItem = cart.items.find((item) => item.id === itemId);
  if (!cartItem) return;
  await prisma.cartItem.delete({
    where: {
      id: cartItem.id,
    },
  });
  revalidatePath("/");
}
