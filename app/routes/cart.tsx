import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useCart } from "~/context/CartContext";

import {
   Minus,
   Plus,
   Trash2,
} from "lucide-react";


export function meta({}: Route.MetaArgs) {
   return [
      { title: "Cart" },
      { name: "description", content: "Coding Challenge for LTPLabs" },
   ];
}

export default function Cart() {

   const {
      cart,
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      loading
   } = useCart();

   const shipping = cart.length > 0 ? 20 : 0;

   const finalTotal = totalPrice + shipping;


   if (loading) {
      return (
         <div className="flex min-h-screen items-center justify-center">
            <div
               className="
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-[#1F3044]
                  border-t-transparent
               "
            />
         </div>
      );
   }
   

   if (cart.length === 0) {
      return (
         <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
         <h1 className="mb-4 text-3xl font-semibold text-[#1F3044]">
            Your cart is empty
         </h1>

         <p className="mb-8 text-gray-600">
            Looks like you haven't added anything yet.
         </p>

         <Link
            to="/"
            className="font-ubuntu rounded-lg bg-[#1F3044] px-6 py-3 text-white"
         >
            Continue Shopping
         </Link>
         </div>
      );
   }

   
   return (
      <div className="min-h-screen overflow-x-hidden mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-8">
         <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

            {/* Cart items */}
            <div>

               {cart.map((item) => (

                  <div
                     key={item.product.id}
                     className="
                        flex
                        min-w-0
                        gap-3
                        border-b
                        border-[#1F3044]
                        py-5
                        sm:gap-5
                     "
                  >

                     {/* Product image section */}
                     <Link
                        to={`/products/${item.product.id}`}
                        className="
                           h-24
                           w-24
                           shrink-0
                           overflow-hidden
                           bg-gray-100
                           sm:h-32
                           sm:w-32
                        "
                     >
                        <img
                           src={item.product.thumbnail}
                           alt={item.product.title}
                           className="h-full w-full object-cover"
                        />
                     </Link>

                     {/* Product info section */}
                     <div className="flex min-w-0 flex-1 flex-col justify-between">

                        <div>
                           <Link
                              to={`/products/${item.product.id}`}
                              className="hover:underline"
                              >
                              <h2
                                 className="
                                    wrap-break-word
                                    text-[15px]
                                    font-normal
                                    leading-5
                                    text-[#1F3044]
                                 "
                              >
                                 {item.product.title}
                              </h2>
                           </Link>

                           <p className="text-[15px] font-normal leading-5 mt-1 text-[#1F3044]">
                           ${item.product.price.toFixed(2)}
                           </p>
                        </div>

                        {/* Edit controls */}
                        <div className="flex flex-wrap items-center gap-3">

                           {/* Change quantity */}
                           <div className="flex h-9 items-center rounded-lg border border-[#1F3044]">

                              <button
                                 onClick={() =>
                                    decreaseQuantity(item.product.id)
                                 }
                                 className="flex h-full w-9 items-center justify-center text-[#1F3044]"
                              >
                                 <Minus size={14} />
                              </button>

                              <span className="flex w-8 items-center justify-center text-[15px] text-[#1F3044]">
                                 {item.quantity}
                              </span>

                              <button
                                 onClick={() =>
                                    increaseQuantity(item.product.id)
                                 }
                                 className="flex h-full w-9 items-center justify-center text-[#1F3044]"
                              >
                                 <Plus size={14} />
                              </button>
                           </div>

                           {/* Remove from cart */}
                           <button
                              onClick={() =>
                                 removeFromCart(item.product.id)
                              }
                              className="text-[#1F3044]"
                           >
                              <Trash2 size={18} />
                           </button>

                        </div>

                     </div>

                  </div>
               ))}

            </div>


            {/* Cart Summary */}
            <aside
               className="
                  min-w-0
                  max-w-full
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#1F3044]
                  p-4
                  sm:p-6
               "
            >

               <h2 className="font-ubuntu mb-6 text-3xl font-semibold text-[#1F3044]">
                  Cart Summary
               </h2>

               <div className="space-y-3 text-[15px] leading-5 text-[#1F3044]">

                  <div className="flex items-center justify-between font-ubuntu">
                     <span>Subtotal</span>
                     <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between font-ubuntu">
                     <span>Shipping</span>
                     <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between font-ubuntu">
                     <span>Total</span>
                     <span className="text-[17px] leading-6">${finalTotal.toFixed(2)}</span>
                  </div>

               </div>

               {/* Checkout */}
               <button
                  className="
                     mt-8
                     w-full
                     rounded-lg
                     bg-[#1F3044]
                     py-2
                     leading-5
                     text-white
                     font-mono
                  "
               >
                  Check out
               </button>

               <button
                  className="
                     mt-6
                     w-full
                     text-center
                     text-[13px]
                     leading-4
                     text-[#1F3044]
                     hover:underline
                     font-ubuntu
                  "
               >
                  Or pay with PayPal
               </button>

               {/* HR / Divider */}
               <div className="my-6 border-t border-[#1F3044]" />

               {/* Promo section */}
               <div>

                  <label className="mb-2 block text-sm text-[#1F3044]">
                     Promo code
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

                     <input
                        type="text"
                        placeholder="Enter code"
                        className="
                           h-9
                           min-w-0
                           flex-1
                           rounded-lg
                           border
                           border-[#1F3044]
                           px-3
                           py-2
                           text-[15px]
                           leading-5
                           text-[#1F3044]
                           outline-none
                        "
                     />

                     <button
                        className="
                           h-9
                           w-full
                           shrink-0
                           rounded-lg
                           bg-[#1F3044]
                           px-4
                           text-[15px]
                           leading-5
                           text-white
                           font-ubuntu
                           sm:w-auto
                        "
                     >
                        Apply
                     </button>

                  </div>

               </div>

            </aside>

         </div>
      </div>
   );
}