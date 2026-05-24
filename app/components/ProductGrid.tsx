import ProductCard from "./ProductCard";
import type { Product } from "~/types/product";

type ProductGridProps = {
   items: Product[]
};

export default function ProductGrid( { items } : ProductGridProps ) {

   if (items.length === 0) {
      return (
         <p className="text-sm text-gray-500">
            No products found.
         </p>
      );
   }
   
   return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
         {items.map((product) => (
            <ProductCard
               key={product.id}
               product={product}
            />
         ))}
      </div>
   )
}