"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "https://zoommer-api.lemon.do/v1/Content/filter?catId=21"
        );
        setFilterOptions(response.data.specifications);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <>
      <section>
        <Header onSearch={setSearchQuery} />
        <main>
          <ProductPage
            searchQuery={searchQuery}
            filterOptions={filterOptions}
          />
        </main>
      </section>
    </>
  );
}
