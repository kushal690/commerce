"use client"
import { FC, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Product } from "@prisma/client";
import { addToCartAction } from "@/_actions/cart";
import { toast } from "../ui/use-toast";

interface productCardProps {
  className?: string;
  product: Product;
}

const ProductCard: FC<productCardProps> = ({ className, product }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Card className={cn("h-full rounded-md", className)}>
      <Link href={`/product/${product?.id ?? 1}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product?.images?.length ? (
              <Image
                src={product.images[0] ?? "/images/product-placeholder.webp"}
                alt={product.images[0] ?? product.name}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link href={`/product/${product?.id}`}>
        <CardContent className="p-2">
          <CardTitle className="line-clamp-1 text-gray-800 text-xl font-semibold ">
            {product?.name ?? "Testing product"}
          </CardTitle>
          <CardDescription className="flex gap-x-2">
            <h3 className="text-gray-600 text-base font-medium line-through leading-10">
              {formatPrice(product?.price ? product?.price! + 200 : 800)}
            </h3>
            <h3 className="text-orange-500 text-base font-medium leading-10">
              {formatPrice(product?.price! ?? 500)}
            </h3>
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-2  justify-around">
        <Button asChild variant="outline" size="lg">
          <Link href={`/product/${product?.id}`}>Preview</Link>
        </Button>
        <Button size="lg" onClick={() => {
          startTransition(async () => {
            try {
              await addToCartAction({ productId: product!.id, quantity: 1 })
            } catch (err: unknown) {
              toast({ title: "Error", description: err as string, variant: "destructive" })
            }
          })
        }}
          disabled={isPending}
        >{isPending ? (
          <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
        ) : null
          } Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
