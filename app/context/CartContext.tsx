import {
   createContext,
   useContext,
   useEffect,
   useState,
} from "react";

import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

import {
   loadCart,
   saveCart,
   addItemToCart,
   removeItemFromCart,
   increaseItemQuantity,
   decreaseItemQuantity,
   updateItemQuantity,
   calculateTotalItems,
   calculateTotalPrice,
} from "~/utils/cart";

type CartContextType = {
   cart: CartItem[];

   addToCart: (product: Product) => void;

   removeFromCart: (id: number) => void;

   increaseQuantity: (id: number) => void;

   decreaseQuantity: (id: number) => void;

   updateQuantity: (id: number, quantity: number) => void;

   totalItems: number;

   totalPrice: number;

   loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);


export function CartProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   
   // Cart state
   const [cart, setCart] = useState<CartItem[]>([]);

   // Loading state
   const [loading, setLoading] = useState(true);

   // Load cart from local storage
   useEffect(() => {
      setCart(loadCart());
      setLoading(false);
   }, []);

   
   // save to local storage
   useEffect(() => {
      if (loading) {
         return;
      }

      saveCart(cart);
   }, [cart, loading]);
   

   // Cart actions

   function addToCart(product: Product) {
      setCart((prev) =>
         addItemToCart(prev, product)
      );
   }

   function removeFromCart(id: number) {
      setCart((prev) =>
         removeItemFromCart(prev, id)
      );
   }

   function increaseQuantity(id: number) {
      setCart((prev) =>
         increaseItemQuantity(prev, id)
      );
   }

   function decreaseQuantity(id: number) {
      setCart((prev) =>
         decreaseItemQuantity(prev, id)
      );
   }

   function updateQuantity(
      id: number,
      quantity: number
   ) {

      setCart((prev) =>
         updateItemQuantity(
            prev,
            id,
            quantity
         )
      );
   }

   // Cart stats

   const totalItems = calculateTotalItems(cart);

   const totalPrice = calculateTotalPrice(cart);
   

   return (
      <CartContext.Provider
      value={{
         cart,
         addToCart,
         removeFromCart,
         increaseQuantity,
         decreaseQuantity,
         updateQuantity,
         totalItems,
         totalPrice,
         loading
      }}
      >
      {children}
      </CartContext.Provider>
   );
}

export function useCart() {
   
   const context = useContext(CartContext);
   
   if (!context) {
      throw new Error(
         "useCart must be used inside CartProvider"
      );
   }
   
   return context;
}