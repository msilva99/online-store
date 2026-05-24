import type { CartItem } from "~/types/cart";
import type { Product } from "~/types/product";

// Load & save helpers

export function loadCart(): CartItem[] {

   try {

      const storedCart = localStorage.getItem("cart");

      return storedCart
         ? JSON.parse(storedCart)
         : [];

   } catch {
      return [];
   }
}

export function saveCart(
   cart: CartItem[]
) {

   localStorage.setItem(
      "cart",
      JSON.stringify(cart)
   );
}

// Cart helpers

export function addItemToCart(
   cart: CartItem[],
   product: Product
): CartItem[] {

   const existing = cart.find(
      (item) => item.product.id === product.id
   );

   // Increase quantity if item already exists
   if (existing) {

      return cart.map((item) =>
         item.product.id === product.id
            ? {
               ...item,
               quantity: item.quantity + 1,
            }
            : item
      );
   }

   // Add new item if it doesn't
   return [
      ...cart,
      {
         product,
         quantity: 1,
      },
   ];
}

export function removeItemFromCart(
   cart: CartItem[],
   id: number
): CartItem[] {

   return cart.filter(
      (item) => item.product.id !== id
   );
}

export function increaseItemQuantity(
   cart: CartItem[],
   id: number
): CartItem[] {

   return cart.map((item) =>
      item.product.id === id
         ? {
            ...item,
            quantity: item.quantity + 1,
         }
         : item
   );
}

export function decreaseItemQuantity(
   cart: CartItem[],
   id: number
): CartItem[] {

   return cart
      .map((item) =>
         item.product.id === id
            ? {
                 ...item,
                 quantity: item.quantity - 1,
              }
            : item
      )
      // Remove item if qty becomes zero
      .filter((item) => item.quantity > 0);
}

export function updateItemQuantity(
   cart: CartItem[],
   id: number,
   quantity: number
): CartItem[] {

   if (quantity <= 0) {
      return removeItemFromCart(cart, id);
   }

   return cart.map((item) =>
      item.product.id === id
         ? {
            ...item,
            quantity,
         }
         : item
   );
}

export function calculateTotalItems(
   cart: CartItem[]
): number {

   return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
   );
}

export function calculateTotalPrice(
   cart: CartItem[]
): number {

   return cart.reduce(
      (sum, item) =>
         sum +
         item.product.price * item.quantity,
      0
   );
}