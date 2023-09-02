interface ProductCategory {
  title: string;
  subCategories: ProductSubCategory[];
}

interface ProductSubCategory {
  title: string;
  description: string;
  slug: string;
}

export const productsCategories: ProductCategory[] = [
  {
    title: "Clothing",
    subCategories: [
      {
        title: "T-shirts",
        description: "Cool and comfy tees for effortless style.",
        slug: "t-shirts",
      },
      {
        title: "Hoodies",
        description: "Cozy up in trendy hoodies.",
        slug: "hoodies",
      },
      {
        title: "Pants",
        description: "Relaxed and stylish pants for everyday wear.",
        slug: "pants",
      },
      {
        title: "Shorts",
        description: "Stay cool with casual and comfortable shorts.",
        slug: "shorts",
      },
      {
        title: "Hats",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "hats",
      },
    ],
  },
  {
    title: "Electronics",
    subCategories: [
      {
        title: "Phones",
        description: "Stay connected with the latest smartphones.",
        slug: "phones",
      },
      {
        title: "Laptops",
        description: "Work and play with the latest laptops.",
        slug: "laptops",
      },
      {
        title: "Tablets",
        description: "Stay connected with the latest tablets.",
        slug: "tablets",
      },
      {
        title: "Headphones",
        description:
          "Listen to your favorite music with the latest headphones.",
        slug: "headphones",
      },
      {
        title: "Speakers",
        description: "Listen to your favorite music with the latest speakers.",
        slug: "speakers",
      },
    ],
  },
  {
    title: "Watches",
    subCategories: [
      {
        title: "Smartwatches",
        description: "Stay connected with the latest smartwatches.",
        slug: "smartwatches",
      },
      {
        title: "Analog",
        description: "Stay on time with the latest analog watches.",
        slug: "analog",
      },
      {
        title: "Digital",
        description: "Stay on time with the latest digital watches.",
        slug: "digital",
      },
      {
        title: "Sports",
        description: "Stay on time with the latest sports watches.",
        slug: "sports",
      },
      {
        title: "Luxury",
        description: "Stay on time with the latest luxury watches.",
        slug: "luxury",
      },
    ],
  },
];

export function getSubcategories(category?: string) {
  if (!category) return [];

  const subcategories =
    productsCategories
      .find((c) => c.title.toLowerCase() === category.toLowerCase())
      ?.subCategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}
