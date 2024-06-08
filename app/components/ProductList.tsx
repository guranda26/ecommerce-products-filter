import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/Products/v3", {
        params: {
          CategoryId: 21,
          Page: page,
          Limit: 12,
        },
      });
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button onClick={loadMoreProducts} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default ProductList;
