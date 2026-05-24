import { Link } from "react-router"
import type { Product } from "~/types/product"

type ProductCardProps = {
   product: Product
};

export default function ProductCard( { product } : ProductCardProps ) {
   return (
      <Link
         to={`/products/${product.id}`}
         aria-label={product.title}
         className="
            mx-auto
            block
            w-full
            max-w-65
            transition-opacity
            hover:opacity-80
         "
      >

         <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover"
         />

         <div className="mt-3">
            <h3 className="text-sm font-medium">
               {product.title}
            </h3>

            <p className="text-sm text-gray-700">
               ${product.price}
            </p>
         </div>

      </Link>
   )
}