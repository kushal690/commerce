"use client";
import { ArrowLeft, ArrowRight, Plus, Star } from "lucide-react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@prisma/client";

interface ProductSliderContainerProps {
  products: Product[];
}

const ProductSliderContainer: FC<ProductSliderContainerProps> = ({
  products,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      if (direction === "left") {
        sliderRef.current.scrollLeft -= 200;
      } else {
        sliderRef.current.scrollLeft += 200;
      }
    }
  };
  return (
    <div className="relative h-72 w-[700px] flex rounded-xl">
      <Button
        onClick={() => handleScroll("left")}
        variant="outline"
        size="icon"
        className={cn("flex rounded-full absolute top-1/2 left-0", {
          hidden: scrollLeft === 0,
        })}
      >
        <ArrowLeft className="w-4 h-4 stroke-black" />
      </Button>
      <div
        ref={sliderRef}
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        className="w-[650px] px-2 flex overflow-hidden items-center gap-x-2"
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            imageUrl={product.images[0]}
            rating={product.rating}
          />
        ))}
      </div>
      <Button
        onClick={() => handleScroll("right")}
        variant="outline"
        size="icon"
        className={cn("rounded-full absolute top-1/2 right-0", {
          hidden:
            scrollLeft ===
            sliderRef.current?.scrollWidth! - sliderRef.current?.clientWidth!,
        })}
      >
        <ArrowRight className="w-4 h-4 stroke-black" />
      </Button>
    </div>
  );
};

export default ProductSliderContainer;

interface ProductItemProps {
  imageUrl?: string;
  title?: string;
  price?: number;
  rating?: number;
  id: string;
}

export const ProductItem: FC<ProductItemProps> = ({
  imageUrl,
  title,
  price,
  rating,
  id,
}) => {
  return (
    <Link href={`/product/${id}`}>
      <div className=" p-3 flex justify-around flex-col gap-y-1 w-48 h-60 shrink-0 bg-white rounded-2xl shadow-all">
        <div className="flex justify-center items-center overflow-hidden">
          <Image
            src={imageUrl ?? "/icons/headphone.png"}
            alt="Product image"
            width={150}
            height={150}
            className="w-full h-32 object-cover"
          />
        </div>
        <h2 className="">{title ?? "Original Beats Solo Pro"}</h2>
        <p className="text-sm text-gray-500">{formatPrice(Number(price)) ?? "$333.20"}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-1">
            <Star fill="#00E0C6" className="w-4 h-4 text-[#00e0c6]" />
            <h2 className="text-sm text-[#00E0C6]">{rating ?? "4.5"}</h2>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7 bg-[#009393] hover:bg-[#00E0C6]"
          >
            <Plus fill="white" className="w-4 h-4 stroke-white" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
