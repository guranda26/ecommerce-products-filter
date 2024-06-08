import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query: routerQuery } = router;
  const query = typeof routerQuery.query === "string" ? routerQuery.query : "";

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const products = await getProducts(
            0,
            1,
            10,
            { filterIds: [] },
            query
          );
          setSearchResults(products);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchData();
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for `{query}`</h1>
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
