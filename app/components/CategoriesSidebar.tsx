import { useSearchParams } from "react-router";
import { ChevronDown } from "lucide-react";

type Category = {
   slug: string
   name: string
   url: string
};

type CategoriesSidebarProps  = {
   categories: Category[]
};

export default function CategoriesSidebar({ categories } : CategoriesSidebarProps ) {

   const [searchParams, setSearchParams] = useSearchParams();

   const currentCategory = searchParams.get("category");

   function handleCategory(slug: string) {

      const params = new URLSearchParams(searchParams);

      if (!slug || currentCategory === slug) {
         params.delete("category")
      }
      else {
         params.set("category", slug)
      }

      params.delete("page");

      setSearchParams(params);
   }
   
   return (
      <>

         {/* Mobile view */}
         <div className="relative lg:hidden">
            <select
               value={currentCategory ?? ""}
               onChange={(event) => handleCategory(event.target.value)}
               className="
                  w-full
                  h-11
                  appearance-none
                  rounded-lg
                  border
                  border-[#1F3044]
                  bg-white
                  px-4
                  pr-10
                  text-[15px]
                  text-[#1F3044]
               "
            >
               <option value="">
                  All Categories
               </option>

               {categories.map((category) => (
                  <option
                     key={category.slug}
                     value={category.slug}
                  >
                     {category.name}
                  </option>
               ))}
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
      
         {/* Desktop view */}
         <div className="hidden lg:block">
            
            <h2 className="mb-4 font-medium">
               Categories
            </h2>
            
            <div className="space-y-4">
               
               {categories.map((category) => (
                  <label
                     key={category.slug}
                     aria-label="Select category"
                     className="flex items-center gap-3"
                  >
                     <input
                        type="checkbox"
                        name="category"
                        checked={currentCategory === category.slug}
                        onChange={() => handleCategory(category.slug)}
                     />
                     
                     <span>{category.name}</span>
                  </label>
               ))}
               
            </div>
            
            <hr className="mt-8" />
            
         </div>
      </>
   )
}