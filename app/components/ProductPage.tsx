import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import FilterSelect from "./ProductFilter";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/products";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ProductPageProps } from "../interfaces/ProductPageProps";

const Container = styled.div`
  display: flex;
  padding: 20px;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ProductsSection = styled.div`
  flex: 1;
  padding-left: 20px;
  position: relative;

  @media (max-width: 1024px) {
    padding-left: 0;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const LoadMoreButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 90px;
  padding: 10px 20px;
  font-family: FiraGO;
  font-size: 12px;
  font-weight: 500;
  margin: 20px auto;
  display: block;
  border: none;
`;

const SortSelect = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  width: 157px;
  height: 32px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 2px 4px 0px #0000001a;
  font-family: FiraGo;
  font-size: 12px;
  display: flex;
  position: relative;
  padding-left: 15px;
  align-items: center;
  display: inline-flex;
  justify-content: space-around;

  @media (max-width: 1024px) {
    align-items: center;
    width: 40%;
    justify-content: space-between;
    padding: 0 25px;
  }
`;

export const SortOptions = styled.div`
  cursor: pointer;
  gap: 10px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px #00000033;
  padding: 15px;
  & div {
    margin-bottom: 10px;
    font-family: FiraGO;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
  }
  & div:hover {
    color: #000;
    font-weight: 800;
  }
`;

const NotFoundMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const ProductPage: React.FC<ProductPageProps> = ({
  searchQuery,
  filterOptions,
}) => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [sortOption, setSortOption] = useState<
    "none" | "ascending" | "descending"
  >("none");
  const [sortOptionsVisible, setSortOptionsVisible] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOptionsVisible(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    try {
      const allProducts = await getProducts(
        21,
        1,
        1000,
        { filterIds: selectedFilters },
        searchQuery
      );

      let filteredProducts = allProducts.filter((product: Product) => {
        const combinedFilterValue = selectedFilters
          .map(
            (filterId) =>
              filterOptions
                .flatMap((option) => option.values)
                .find((value) => value.id === filterId)?.value
          )
          .filter(Boolean)
          .join(" ");

        const productName = product.name;
        const filterWords = combinedFilterValue.split(" ");
        return filterWords.every((word) => productName.includes(word));
      });

      if (sortOption === "ascending") {
        filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
      } else if (sortOption === "descending") {
        filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
      }

      setTotalProducts(filteredProducts.length);

      const startIndex = (page - 1) * 12;
      const endIndex = startIndex + 12;
      filteredProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(filteredProducts);
      setHasMore(filteredProducts.length === 12);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }, [searchQuery, selectedFilters, page, sortOption, filterOptions]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (filterId: number) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter((id) => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
    setPage(1);
  };

  const handleSortOptionChange = (option: "ascending" | "descending") => {
    setSortOption(option);
    setSortOptionsVisible(false);
  };

  const toggleSortOptions = () => {
    setSortOptionsVisible((prev) => !prev);
  };

  return (
    <Container>
      <GlobalStyles />
      <FilterSelect
        categories={filterOptions}
        selectedFilters={selectedFilters}
        onChange={handleFilterChange}
      />
      <ProductsSection>
        <FilterContainer>
          <SortSelect ref={sortRef} onClick={toggleSortOptions}>
            <p>დალაგება </p>
            <div>
              {sortOptionsVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </div>
          </SortSelect>
          <SortOptions
            style={{ display: sortOptionsVisible ? "block" : "none" }}
          >
            <div onClick={() => handleSortOptionChange("ascending")}>
              ფასი: ზრდადობით
            </div>
            <div onClick={() => handleSortOptionChange("descending")}>
              ფასი: კლებადობით
            </div>
          </SortOptions>
        </FilterContainer>
        {products.length === 0 ? (
          <NotFoundMessage>No products found</NotFoundMessage>
        ) : (
          <ProductsGrid>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        )}
        {hasMore && !loading && (
          <LoadMoreButton onClick={loadMoreProducts}>Load More</LoadMoreButton>
        )}
        {loading && <p>Loading...</p>}
      </ProductsSection>
    </Container>
  );
};

export default ProductPage;
