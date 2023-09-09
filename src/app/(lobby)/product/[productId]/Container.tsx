"use client";
import { Icons } from "@/components/icons";
import { FC, useState } from "react";
import { Balancer } from "react-wrap-balancer";
import QuantityCounter from "./QuantityCounter";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";

interface ContainerProps {
  product: Product;
}

const sizes = ["Small", "Medium", "Large"];
const colors = ["red", "teal", "green", "blue"];

const Container: FC<ContainerProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-black">
        <Balancer>{product.name}</Balancer>
      </h1>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Icons.star size={18} fill="orange" color="orange" />
          <Icons.star size={18} fill="orange" color="orange" />
          <Icons.star size={18} fill="orange" color="orange" />
          <Icons.star size={18} fill="orange" color="orange" />
          <Icons.star size={18} fill="orange" color="orange" />
          <h2 className="font-medium">{product.rating} Rating</h2>
        </div>
        <div className="flex gap-1.5 items-center">
          <Icons.verified className="w-5 h-5" />
          <h2>{product.quantity === 0 ? "Out of stock" : "In Stock"}</h2>
        </div>
      </div>
      <h2 className="w-full lg:w-96 text-gray-500 text-sm font-medium leading-normal">
        <Balancer>{product.description}</Balancer>
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3>Quantity</h3>
          <QuantityCounter setTotalQuantity={setQuantity} maxQuantity={product.quantity} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-black font-semibold text-2xl">
            {formatPrice(quantity > 1 ? product.price * quantity : product.price)}
          </h2>
          <h4 className="text-sm text-gray-700 font-medium">+12% VAT Added</h4>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="text-white hover:text-white bg-orange-500 hover:bg-orange-500/80"
      >
        Add to Cart
      </Button>
      <div className="flex gap-y-4 justify-between flex-col md:flex-row lg:flex-col">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold text-black">Select Size</h2>
          <div className="flex gap-x-3">
            {sizes.map(size => (
              <Button key={size} variant="outline" onClick={() => setSelectedSize(size)} className={cn("", {
                "bg-blue-700 text-white hover:text-white hover:bg-blue-700": size === selectedSize
              })}>{size}</Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-semibold text-black">Choose Color</h2>
          <div className="flex gap-x-3">
            {colors.map(color => (
              <div key={color} onClick={() => setSelectedColor(color)} className={cn(`w-10 h-10 flex justify-center items-center rounded-md ${bgVariants[color]}`)}><Icons.check className={cn("hidden", {
                "block": color === selectedColor
              })} color="white" /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-semibold text-black">Product Details</h2>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between text-gray-700 text-sm">
            <h3>Size</h3>
            <h3>{sizes.join(", ")}</h3>
          </div>
          <Separator />
          <div className="flex justify-between text-gray-700 text-sm">
            <h3>Color</h3>
            <h3>{colors.map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join(", ")}</h3>
          </div>
          <Separator />
          <div className="flex justify-between text-gray-700 text-sm">
            <h3>Brand</h3>
            <h3>No Brand</h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Container;

const bgVariants: Record<string, string> = {
  teal: "bg-teal-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};
