export function getSearchParams(url: URL) {

   return {
      page: Number(
         url.searchParams.get("page") ?? "1"
      ),

      category:
         url.searchParams.get("category"),

      sort:
         url.searchParams.get("sort"),
   };
}