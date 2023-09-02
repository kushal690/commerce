import Products from "@/components/Products";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { type Metadata } from "next";
import { FC } from "react";
import { products } from "../page";

interface pageProps { }

export const metadata: Metadata = {
  title: "Products",
  description: "Buy products from our stores",
};

const page: FC<pageProps> = ({ }) => {
  return (
    <Shell>
      <PageHeader aria-labelledby="products-page-header">
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy Products from our store
        </PageHeaderDescription>
      </PageHeader>
      <Products products={products} />
    </Shell>
  );
};

export default page;
