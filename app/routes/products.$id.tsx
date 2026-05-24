import type { Route } from "./+types/home";
import { useLoaderData } from "react-router"
import { useCart } from "~/context/CartContext";

import {
   getProduct,
} from "~/services/products.server";

import {
   Minus,
   Plus,
   Trash2,
} from "lucide-react";



export function meta({}: Route.MetaArgs) {
   return [
      { title: "Product Detail" },
      { name: "description", content: "Coding Challenge for LTPLabs" },
   ];
}


export async function loader( { params } : { params : { id : string } } ) {
   
   const product = await getProduct(params.id);
   
   return product;
}


export default function ProductDetailPage() {

   const product = useLoaderData();

   const {
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
   } = useCart();

   const cartItem = cart.find(
      (item) => item.product.id === product.id
   );

   return (
      <div className="min-h-screen">

         <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 lg:flex-row">

            {/* Product image section */}
            <main className="flex-1">
               <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full"
               />
            </main>

            {/* Product info section */}
            <aside className="w-full lg:w-100">

               <h1 className="text-3xl font-semibold">
                  {product.title}
               </h1>

               <p className="mt-4 text-2xl">
                  ${product.price}
               </p>

               {/* If it's already in the cart */}
               {cartItem ? (

                  <div className="mt-6 flex items-center gap-4">

                     <div className="flex h-11 items-center rounded-lg border border-[#1F3044]">

                        <button
                           onClick={() =>
                              decreaseQuantity(product.id)
                           }
                           className="
                              flex
                              h-full
                              w-11
                              items-center
                              justify-center
                              text-[#1F3044]
                           "
                        >
                           <Minus size={16} />
                        </button>

                        <span
                           className="
                              flex
                              w-10
                              items-center
                              justify-center
                              text-[15px]
                              text-[#1F3044]
                           "
                        >
                           {cartItem.quantity}
                        </span>

                        <button
                           onClick={() =>
                              increaseQuantity(product.id)
                           }
                           className="
                              flex
                              h-full
                              w-11
                              items-center
                              justify-center
                              text-[#1F3044]
                           "
                        >
                           <Plus size={16} />
                        </button>

                     </div>

                     {/* DELETE */}
                     <button
                        onClick={() =>
                        removeFromCart(product.id)
                        }
                        className="text-[#1F3044]"
                     >
                        <Trash2 size={18} />
                     </button>

                  </div>

               // If it's not in the cart yet
               ) : (

                  <button
                     onClick={() => addToCart(product)}
                     className="
                        mt-6
                        w-full
                        rounded-lg
                        bg-[#1F3044]
                        px-6
                        py-4
                        text-white
                     "
                  >
                     Add to cart
                  </button>

               )}

               <hr className="my-8" />

               <p className="text-gray-700">
                  {product.description}
               </p>

            </aside>

         </div>
      </div>
   )
}