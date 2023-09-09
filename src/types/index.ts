import { FileWithPath } from "react-dropzone";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  categoryName: string;
  subCategoryName: string;
  rating: number;
  quantity: number;
  slug: string;
  categories?: Category;
  subCategories?: SubCategory;
};

type Category = {
  id: number;
  name: string;
  description?: string;
  slug: string;
};

type SubCategory = {
  id: number;
  name: string;
  categoryName?: string;
  description?: string;
  slug: string;
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};
