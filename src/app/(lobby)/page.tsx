import BillBoard from "@/components/product/BillBoard";
import DailyDeals from "@/components/product/DailyDeals";
import FeaturedProduct from "@/components/product/FeaturedProduct";
import ProductSliderContainer from "@/components/product/ProductSlider";
import CategoryContainer from "@/components/category/CategoryContainer";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <div id="hero" className="p-4 flex justify-around ">
        <div className="flex flex-col gap-y-4">
          <FeaturedProduct />
          <ProductSliderContainer />
        </div>
        <div className="flex flex-col gap-y-4">
          <BillBoard />
          <DailyDeals />
        </div>
      </div>
      <Separator className="w-full" />
      <CategoryContainer />
      <Separator />
      <div className="px-8 py-3 flex flex-col gap-y-3">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="grid grid-cold-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => {
            return <ProductCard key={i}
              product={{ id: i, ...product }} />
          })}
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            className="w-72 h-12 font-semibold text-white hover:text-white bg-orange-500 hover:bg-orange-500/80"
          >
            <Link href="/products">Explore all products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const products: Pick<Product, "name" | "images" | "price">[] = [
  {
    name: "T-Shirt",
    price: 1000,
    images: ["/images/clothes.jpeg"],
  },
  {
    name: "Apple Airpod",
    price: 10000,
    images: ["/images/apple-pro.jpeg"],

  },
  {
    name: "Beats Blue",
    price: 1500,
    images: ["/icons/headphone.png"],
  },
  {
    name: "Nike Airmax",
    price: 12000,
    images: ["/images/shoes.jpeg"],
  },
  {
    name: "Lenovo wired headphone",
    price: 900,
    images: ["/images/lenovo-black.png"],
  },
  {
    name: "Beats Black",
    price: 1000,
    images: ["/images/black-headphone.png"],
  },
  {
    name: "Macbook Pro 2023",
    price: 260000,
    images: ["/images/electronics.jpeg"],
  },

  {
    name: "Toa Watch",
    price: 10500,
    images: ["/images/black-watch.jpeg"],
  },

]
