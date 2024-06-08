import React, { useState, useEffect } from "react";
import { getFilterData } from "../api/filterData";

const FilterDataComponent = () => {
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    const categoryId = 21;
    getFilterData(categoryId)
      .then((data) => {
        setFilterData(data);
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Filter Data:</h2>
      {filterData ? (
        <pre>{JSON.stringify(filterData, null, 2)}</pre>
      ) : (
        <p>Loading filter data...</p>
      )}
    </div>
  );
};

export default FilterDataComponent;
