"use client";
import Icon from "@/lib/DynamicIcon";
import { cn } from "@/lib/utils";
import { HeartIcon, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "../ui/button";

interface FeaturedProductProps { }

const FeaturedProduct: FC<FeaturedProductProps> = ({ }) => {
  const [color, selectColor] = useState("teal");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((isFav) => !isFav);
  }

  const handleQuantity = (type: string) => {
    if (type === "increment") {
      setQuantity((q) => q + 1);
    } else {
      if (quantity > 1) {
        setQuantity((q) => q - 1);
      }
    }
  }

  const colors = ["red", "teal", "green", "blue"];

  return (
    <div className="w-full md:w-[650px] h-72 flex justify-between px-4 py-2 bg-white rounded-lg shadow-default">
      <Image
        src="/icons/headphone.png"
        alt="Featured product"
        width={250}
        height={250}
        className="w-[230px] h-[230px] object-cover "
      />
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl font-medium">
          Beats Studio3 Wireless Headphone
        </h2>
        <div className="flex gap-x-1">
          <Star fill="yellow" color="yellow" className="w-5 h-5" />
          <Star name="star" fill="yellow" color="yellow" className="w-5 h-5" />
          <Star name="star" fill="yellow" color="yellow" className="w-5 h-5" />
          <Star name="star" fill="yellow" color="yellow" className="w-5 h-5" />
          <Star name="star" fill="yellow" color="yellow" className="w-5 h-5" />
          <h2 className="text-sm text-gray-700">(2000+ Reviews)</h2>
        </div>
        <p className="text-xs text-gray-700">
          Ergonomic ear cups with on-ear controls. Up to 22 hours of listening
          time. Apple W1 chip & Class 1 Wireless Bluetooth.
        </p>
        <h2 className="text-lg font-semibold text-teal-600">Price $349.95</h2>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <h2>Color</h2>
            {colors.map((c) => {
              return (
                <div
                  key={c}
                  className={cn(
                    `w-4 h-4 rounded-full cursor-pointer ${bgVariants[c]}`,
                    {
                      [`ring-2 ring-offset-2 ${ringVariants[c]}`]: color === c,
                    },
                  )}
                  onClick={() => selectColor(c)}
                />
              );
            })}
          </div>
          <div className="w-24 h-8 px-2 flex items-center justify-between bg-zinc-100 rounded-3xl">
            <Button variant="outline"
              className="w-6 h-6 bg-white rounded-full "
              size="icon"
              onClick={() => handleQuantity("decrement")}
            >
              <Minus
                name="minus"
                className="w-6 h-6 text-gray-700 "
              />

            </Button>
            <h2 className="text-gray-700">{quantity}</h2>
            <Button variant="outline"
              className="w-6 h-6 bg-white rounded-full "
              size="icon"
              onClick={() => handleQuantity("increment")}
            >
              <Plus
                name="plus"
                className="w-6 h-6  text-gray-700 "
              />
            </Button>
          </div>
        </div>
        <div className="flex justify-around font-semibold">
          <Button
            onClick={handleFavorite}
            variant="outline" className={`w-16 h-10 `}>
            <HeartIcon
              name="shopping-cart"
              className={cn(`w-6 h-6 fill-white ${textVariants[color]}`, {
                [fillVariants[color]]: isFavorite,
              })}
            />
          </Button>
          <Button
            variant="outline"


          >
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="px-7 bg-orange-500 text-white hover:bg-orange-500/80 hover:text-white "
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

const bgVariants: Record<string, string> = {
  teal: "bg-teal-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};
const ringVariants: Record<string, string> = {
  teal: "ring-teal-500",
  red: "ring-red-500",
  green: "ring-green-500",
  blue: "ring-blue-500",
};
const borderVariants: Record<string, string> = {
  teal: "border-teal-500",
  red: "border-red-500",
  green: "border-green-500",
  blue: "border-blue-500",
};
const textVariants: Record<string, string> = {
  teal: "text-teal-500",
  red: "text-red-500",
  green: "text-green-500",
  blue: "text-blue-500",
};
const fillVariants: Record<string, string> = {
  teal: "fill-teal-500",
  red: "fill-red-500",
  green: "fill-green-500",
  blue: "fill-blue-500",
}


