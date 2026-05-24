import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router";

type SortByProps  = {
   sort: string | null
}

export default function SortBy({ sort } : SortByProps ) {

   const [searchParams, setSearchParams] = useSearchParams();

   function handleSort(
      event: React.ChangeEvent<HTMLSelectElement>
   ) {
      
      const params = new URLSearchParams(searchParams);
      const value = event.target.value;

      if (value) {
         params.set("sort", value);
      } else {
         params.delete("sort");
      }

      params.delete("page");
      setSearchParams(params);
   }

   
   
   return (
      <div className="relative w-full sm:w-55">
         <select
            value={sort ?? ""}
            onChange={handleSort}
            className="
               w-full
               h-11
               rounded-lg
               border
               border-[#1F3044]
               px-4
               pr-10
               text-[15px]
               leading-5
               font-normal
               text-[#1F3044]
               appearance-none
               bg-white
            "
         >

            <option value="">
               Featured
            </option>

            <option value="title-asc">
               Title A-Z
            </option>

            <option value="title-desc">
               Title Z-A
            </option>

            <option value="price-asc">
               Price Ascending
            </option>

            <option value="price-desc">
               Price Descending
            </option>

         </select>

         <ChevronDown
            size={16}
            className="
               pointer-events-none
               absolute
               right-3
               top-1/2
               -translate-y-1/2
               text-[#1F3044]
            "
         />

      </div>
   )
}