import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router"

import { getVisiblePages } from "~/utils/pagination";

type PaginationProps  = {
   currentPage: number
   total: number
};

export default function Pagination({
   currentPage,
   total,
}: PaginationProps ) {

   const [searchParams, setSearchParams] = useSearchParams();

   const totalPages = Math.ceil(total / 9);

   function handlePage(page: number) {

      const params = new URLSearchParams(searchParams);

      if (page === 1) {
         params.delete("page");
      } else {
         params.set("page", page.toString());
      }

      setSearchParams(params);
   }

   const visiblePages: number[] = getVisiblePages(
      currentPage,
      totalPages
   );


   return (
      <div className="mt-10 flex items-center justify-end gap-4">

         {/* Previous page */}
         {currentPage > 1 && (
            <button
               aria-label="Previous page"
               onClick={() => handlePage(currentPage - 1)}
            >
               <ChevronLeft strokeWidth={1} color="#1F3044" />
            </button>
         )}

         {/* Pagination numbers */}
         {visiblePages.map((page) => (
            <button
               key={page}
               onClick={() => handlePage(page)}
               disabled={currentPage === page}
               className={
                  currentPage === page
                  ? "flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F3044] p-2 text-[15px] leading-5 font-normal text-white"
                  : "flex h-9 w-9 items-center justify-center rounded-lg p-2 text-[15px] leading-5 font-normal text-[#1F3044]"
               }
            >
               {page}
            </button>
         ))}

         {/* Next page */}
         {currentPage < totalPages && (
            <button
               aria-label="Next page"
               onClick={() => handlePage(currentPage + 1)}
            >
               <ChevronRight strokeWidth={1} color="#1F3044" />
            </button>
         )}
      </div>

   )
}