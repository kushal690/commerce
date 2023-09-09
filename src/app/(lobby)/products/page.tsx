import Products from "@/components/Products";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { rsc } from "@/trpc-server/rsc";
import { type Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Products",
  description: "Buy products from our stores",
};

const page: FC<pageProps> = async ({}) => {
  const products: any[] = await rsc.getAllProducts();
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
