import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

interface Product {
  id: number;
  name: string;
}

interface CategoryPageProps {
  categoryId: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const fetchedProducts = await getProducts(
          categoryId,
          1,
          10,
          { filterIds: [] },
          ""
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProductsData();
  }, [categoryId]);

  return (
    <div>
      <h1>Category: {categoryId}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { category } = context.params;
  const categoryId = parseInt(category, 10);
  return {
    props: {
      categoryId,
    },
  };
}

export default CategoryPage;
