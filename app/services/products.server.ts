import type { Product } from "~/types/product";


type GetProductsOptions = {
   page: number;
   limit: number;
   category?: string | null;
};

type ProductsResponse = {
   products: Product[];
   total: number;
};


export async function getCategories() {
   const response = await fetch(
      "https://dummyjson.com/products/categories"
   );

   if (!response.ok) {
      throw new Error("Failed to fetch categories");
   }

   return response.json();
}


export async function getProduct(id: string) {
   const response = await fetch(
      `https://dummyjson.com/products/${id}`
   );

   if (!response.ok) {
      throw new Error("Product not found");
   }

   return response.json();
}


export async function getProducts({
   page,
   limit,
   category,
}: GetProductsOptions): Promise<ProductsResponse> {

   const skip = (page - 1) * limit;

   let endpoint =
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

   if (category) {
      endpoint =
         `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
   }

   const response = await fetch(endpoint);

   if (!response.ok) {
      throw new Error("Failed to fetch products");
   }

   return response.json();
}