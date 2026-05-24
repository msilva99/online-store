import type { Route } from "./+types/home";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

import CategoriesSidebar from "~/components/CategoriesSidebar";
import Pagination from "~/components/Pagination";
import ProductGrid from "~/components/ProductGrid";
import SortBy from "~/components/SortBy";

import {
   getCategories,
   getProducts,
} from "~/services/products.server";

import { getSearchParams } from "~/utils/searchParams";
import { getPaginationRange } from "~/utils/pagination";

export function meta({}: Route.MetaArgs) {

   return [
      { title: "Online Store" },

      {
         name: "description",
         content: "Coding Challenge for LTPLabs",
      },
   ];
}

export async function loader({
   request,
}: LoaderFunctionArgs) {

   const url = new URL(request.url);

   const {
      page,
      category,
      sort,
   } = getSearchParams(url);

   const limit = 9;

   const [categories, data] = await Promise.all([
      getCategories(),

      getProducts({
         page,
         limit,
         category,
      }),
   ]);

   const products = [...data.products];

   // Because this API doesn't support sorting, I am sorting only
   // in the current page which is obviously wrong
   // I considered loading all products and doing the pagination myself,
   // both options felt wrong for the challenge so I chose this approach
   // If there were suddenly 10k products I would NOT want this store loading all of them at once
   switch (sort) {
      case "price-asc":
         products.sort((a, b) => a.price - b.price);
         break;

      case "price-desc":
         products.sort((a, b) => b.price - a.price);
         break;

      case "title-asc":
         products.sort((a, b) =>
            a.title.localeCompare(b.title)
         );
         break;

      case "title-desc":
         products.sort((a, b) =>
            b.title.localeCompare(a.title)
         );
         break;
   }

   return {
      products,
      categories,
      sort,
      page,
      total: data.total,
      limit,
   };
}

export default function Home() {

   const {
      products,
      categories,
      sort,
      page,
      total,
      limit,
   } = useLoaderData();

   const { start, end } = getPaginationRange(page, limit, total);

   return (
      <div className="min-h-screen px-4 sm:px-8 lg:px-12">

         <div
            className="
               mx-auto
               grid
               max-w-7xl
               grid-cols-1
               gap-5
               py-8
               lg:grid-cols-[1fr_240px]
               lg:gap-12
            "
         >

            <aside className="lg:order-2">
               <CategoriesSidebar categories={categories} />
            </aside>

            <main className="min-w-0 lg:order-1">

               <div
                  className="
                     mb-8
                     flex
                     flex-col
                     gap-4
                     sm:flex-row
                     sm:items-center
                     sm:justify-between
                  "
               >

                  <SortBy sort={sort} />

                  <p className="text-sm text-gray-600">
                     Showing {start} – {end} of {total} products
                  </p>

               </div>

               <ProductGrid items={products} />

               <Pagination
                  currentPage={page}
                  total={total}
               />

            </main>
         </div>
      </div>
   );
}