export function getPaginationRange(
   page: number,
   limit: number,
   total: number
) {

   return {
      start: (page - 1) * limit + 1,

      end: Math.min(page * limit, total),
   };
}


export function getVisiblePages(
   currentPage: number,
   totalPages: number,
   maxVisiblePages = 5
) {

   let startPage = Math.max(
      1,
      currentPage -
         Math.floor(maxVisiblePages / 2)
   );

   let endPage =
      startPage + maxVisiblePages - 1;

   if (endPage > totalPages) {

      endPage = totalPages;

      startPage = Math.max(
         1,
         endPage - maxVisiblePages + 1
      );
   }

   const pages = [];

   for (
      let page = startPage;
      page <= endPage;
      page++
   ) {
      pages.push(page);
   }

   return pages;
}