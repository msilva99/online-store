import { useState } from "react";
import { Link } from "react-router";
import {
   Menu,
   X,
   Search,
   User,
   ShoppingBag,
} from "lucide-react";

export default function Header() {
   const [mobileMenuOpen, setMobileMenuOpen] =
      useState(false);

   return (
      <header className="w-full border-b bg-white">
         {/* Top bar */}
         <div
            className="
               mx-auto
               flex
               h-16
               max-w-7xl
               items-center
               justify-between
               px-4
               sm:px-8
               lg:px-12
            "
         >
            {/* Logo */}
            <Link to="/" className="shrink-0">
               <h1
                  className="
                     font-logo
                     text-[28px]
                     sm:text-[32px]
                     font-normal
                     uppercase
                     leading-none
                     tracking-[0.06em]
                     text-[#1F3044]
                  "
               >
                  The Online Store
               </h1>
            </Link>

            {/* Desktop nav links */}
            <nav
               aria-label="Mobile navigation"
               className="
                  hidden
                  items-center
                  gap-8
                  md:flex
                  text-[15px]
               "
            >
               <Link to="/">Home</Link>
               <Link to="/">Shop</Link>

               <span className="cursor-default opacity-50">
                  About
               </span>

               <span className="cursor-default opacity-50">
                  Contact
               </span>

               <span className="cursor-default opacity-50">
                  Blog
               </span>
            </nav>

            {/* Desktop icons */}
            <div className="hidden items-center gap-6 md:flex">
               <button
                  disabled
                  aria-hidden="true"
                  aria-label="Search"
                  className="opacity-50"
               >
                  <Search strokeWidth={1.5} />
               </button>

               <button
                  disabled
                  aria-hidden="true"
                  aria-label="Account"
                  className="opacity-50"
                  >
                  <User strokeWidth={1.5} />
               </button>

               <Link
                  aria-label="Cart"
                  to="/cart"
               >
                  <ShoppingBag strokeWidth={1.5} />
               </Link>
            </div>

            {/* Mobile menu button */}
            <button
               onClick={() =>
                  setMobileMenuOpen((prev) => !prev)
               }
               className="
                  flex
                  items-center
                  justify-center
                  md:hidden
               "
               aria-label="Toggle menu"
               aria-expanded={mobileMenuOpen}
               aria-controls="mobile-menu"
            >
               {mobileMenuOpen ? (
                  <X size={28} />
               ) : (
                  <Menu size={28} />
               )}
            </button>
         </div>

         {/* Mobile menu */}
         {mobileMenuOpen && (
            <div
               id="mobile-menu"
               className="
                  border-t
                  bg-white
                  px-4
                  py-4
                  md:hidden
               "
            >

               {/* Mobile nav links */}
               <nav
                  aria-label="Desktop navigation"
                  className="
                     flex
                     flex-col
                     items-center
                     gap-4
                     text-[16px]
                  "
               >
                  <Link
                     to="/"
                     onClick={() =>
                        setMobileMenuOpen(false)
                     }
                  >
                     Home
                  </Link>

                  <Link
                     to="/"
                     onClick={() =>
                        setMobileMenuOpen(false)
                     }
                  >
                     Shop
                  </Link>

                  <span className="opacity-50">
                     About
                  </span>

                  <span className="opacity-50">
                     Contact
                  </span>

                  <span className="opacity-50">
                     Blog
                  </span>

                  {/* Mobile icons */}
                  <div className="mt-4 flex items-center gap-6">
                     <button
                        disabled
                        aria-hidden="true"
                        aria-label="Search"
                        className="opacity-50"
                     >
                        <Search strokeWidth={1.5} />
                     </button>

                     <button
                        disabled
                        aria-hidden="true"
                        aria-label="Account"
                        className="opacity-50"
                     >
                        <User strokeWidth={1.5} />
                     </button>

                     <Link
                        aria-label="Cart"
                        to="/cart"
                     >
                        <ShoppingBag strokeWidth={1.5} />
                     </Link>
                  </div>
               </nav>
            </div>
         )}
      </header>
   );
}