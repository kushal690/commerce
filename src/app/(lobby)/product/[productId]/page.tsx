import { FC } from "react";
import PreviewImages from "./PreviewImages";
import Container from "./Container";
import { notFound } from "next/navigation";
import { rsc } from "@/trpc-server/rsc";
import { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/pagers/breadcrumbs";
import { toTitleCase } from "@/lib/utils";
import { Shell } from "../../../../components/shells/shell";
import ProductImageCarousel from "@/components/product-image-carousel";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { productId } = params;
  if (!productId || productId.length < 24) notFound();

  const product = await rsc.getProductById({ id: productId });
  if (!product) notFound();

  return {
    title: `${product.name} - ${siteConfig.name}`,
    description: product.description,
    openGraph: {
      url: product.images[0],
    },
  };
}
interface pageProps {
  params: {
    productId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { productId } = params;
  if (!productId || productId.length < 24) notFound();

  const product = await rsc.getProductById({ id: productId });
  if (!product) notFound();

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          { title: "Products", href: "/products" },
          {
            title: toTitleCase(product!.categoryName),
            href: `/categories/${product!.categoryName.toLowerCase()}`,
          },
          { title: product!.name, href: `/product/${product!.id}` },
        ]}
      />
      <div className="px-4 pb-4 lg:px-14 flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel className="w-full md:w-1/2" images={product.images ?? []} options={{ loop: true }} />
        <Container product={product} />
      </div>
    </Shell>
  );
};

export default page;
