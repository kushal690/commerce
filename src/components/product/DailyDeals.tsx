import { ArrowRight } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface DailyDealsProps { }

const DailyDeals: FC<DailyDealsProps> = ({ }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-cyan-800 text-2xl font-semibold">Daily Deals</h2>
        <Button variant="ghost" className="flex items-center gap-1">
          <h4 className="text-zinc-600 text-sm font-medium">View all</h4>
          <ArrowRight className="text-zinc-600" size={16} />
        </Button>
      </div>
      <div className="flex flex-col p-3 gap-y-5">
        <DealsItem price={320} />
        <DealsItem
          title="Beats pro wireless headset"
          price={199}
          imageUrl="/images/black-headphone.png"
        />
        <DealsItem
          title="Apple Airpods pro"
          price={249}
          imageUrl="/images/apple-airpod.png"
        />
        <DealsItem
          title="Lenovo Wired Headphone"
          price={10}
          imageUrl="/images/lenovo-black.png"
        />
        <DealsItem
          title="Logic G-10 pro"
          price={99}
          imageUrl="/images/logic-headphone.png"
        />
      </div>
    </div>
  );
};

export default DailyDeals;

interface DealsItemProps {
  title?: string;
  imageUrl?: string;
  price?: number;
  reviewCount?: number;
  orderCount?: number;
}
export const DealsItem: FC<DealsItemProps> = ({
  title,
  imageUrl,
  price,
  reviewCount,
  orderCount,
}) => {
  return (
    <Link href="/">
      <div className=" flex gap-x-6">
        <Image
          src={imageUrl ?? "/images/blue-headphone.png"}
          alt="Product"
          width={30}
          height={40}
          className="w-7 h-10"
        />
        <div className="flex flex-col gap-y-1">
          <div className="h-5 flex gap-x-2 items-center">
            <h4 className="w-48 truncate text-sm font-medium ">
              {title ?? "beats new studio blue headset"}
            </h4>
            <h3 className="w-16 text-gray-700 text-xs font-medium">
              Price ${price ?? 1000}
            </h3>
          </div>
          <h3 className="w-36 text-gray-700 text-xs font-medium">
            {reviewCount ?? 256} Reviews {orderCount ?? 1628} Orders
          </h3>
        </div>
      </div>
    </Link>
  );
};
