import { FC } from "react";
import ProductCard from "./cards/product-card";

interface ProductsProps {
  products: Pick<Product, "name" | "price" | "images">[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item, i) => (
        <ProductCard key={i} product={{ id: i, ...item }} />
      ))}
    </div>
  );
};

export default Products;
