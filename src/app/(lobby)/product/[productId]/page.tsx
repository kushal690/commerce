import { FC } from "react";
import PreviewImages from "./PreviewImages";
import Container from "./Container";
import { notFound } from "next/navigation"
import { rsc } from "@/trpc-server/rsc";
interface pageProps {
  params: {
    productId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {

  const { productId } = params;
  if (!productId) notFound()

  const product = await rsc.getProductById({ id: productId });
  if (!product) notFound()

  return (
    <div className="p-4 lg:p-14 flex flex-col lg:flex-row gap-8 justify-around">
      <PreviewImages images={product!.images} />
      <Container product={product} />
    </div>
  );
};

export default page;
