import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ProductFilterProps } from "../interfaces/FilterOptions";
import Image from "next/image";
import filterImage from "../icons/filter.svg";
import cartImage from "../icons/shopping-cart.svg";

const FilterCategory = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 10px;
`;

const FilterValues = styled.ul`
  padding-left: 20px;
`;

const FilterItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
  &.selected {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const FilterButton = styled.button`
  margin-bottom: 10px;
  cursor: pointer;
  width: 40%;
  height: 32px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 2px 4px 0px #0000001a;
  font-family: FiraGo;
  font-size: 12px;
  margin-right: 30px;
  position: relative;
  top: 45px;
  left: 44%;
  z-index: 900;
  display: inline-block;
  border: none;
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    padding-left: 25px;
    align-items: center;
    gap: 10px;
  }
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  top: 10px;
  left: 10px;
  font-size: 12px;
`;

const CloseIcon = styled.span`
  display: inline-block;
  color: rgba(0, 0, 0, 0.8);
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  padding-bottom: 7px;
  vertical-align: middle;
  font-size: 28px;
  padding: 0 7px;
  margin-right: 5px;

  &:hover {
    background-color: #bec0c240;
    border-radius: 50%;
  }
  &:active {
    background-color: #bec0c294;
  }
`;

const FilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70vw;
  background-color: white;
  border-left: 1px solid #ccc;
  padding: 20px;
  z-index: 999;
  display: none;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const FilterElements = styled.div`
  width: 350px;
  padding: 20px;
  margin-right: 30px;
  margin-top: 32px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Line = styled.div`
  width: 200px;
  height: 2px;
  background: #f2f2f2;
  margin: 20px 0;
`;

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedFilters,
  onChange,
}) => {
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleCategoryVisibility = (category: string) => {
    setVisibleCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <FilterElements>
        {categories.length === 0 ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((filter, index) => (
            <FilterCategory key={`${filter.name}-${index}`}>
              <FilterTitle
                onClick={() => toggleCategoryVisibility(filter.name)}
              >
                {filter.name}{" "}
                {visibleCategories.includes(filter.name) ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </FilterTitle>
              {visibleCategories.includes(filter.name) && (
                <FilterValues>
                  {filter.values.map((value) => (
                    <FilterItem key={`${filter.name}-${value.id}`}>
                      <CheckboxInput
                        type="checkbox"
                        id={`${filter.name}-${value.id}`}
                        value={value.id.toString()}
                        checked={selectedFilters.includes(value.id)}
                        onChange={() => onChange(value.id)}
                      />
                      <label htmlFor={`${filter.name}-${value.id}`}>
                        {value.value}
                      </label>
                    </FilterItem>
                  ))}
                </FilterValues>
              )}
            </FilterCategory>
          ))
        )}
      </FilterElements>
      <FilterButton
        onClick={() => {
          toggleModal();
        }}
      >
        <Image src={filterImage} alt="Filter" width={20} height={20}></Image>
        <span>ფილტრი</span>
      </FilterButton>

      <FilterModal style={{ display: isModalOpen ? "block" : "none" }}>
        <CloseButton onClick={toggleModal}>
          <CloseIcon>×</CloseIcon>

          <h3>ფილტრი</h3>
        </CloseButton>
        <Line />

        {categories.map((filter, index) => (
          <div key={`${filter.name}-${index}`}>
            <h4>{filter.name}</h4>
            <ul>
              {filter.values.map((value) => (
                <FilterItem key={`${filter.name}-${value.id}`}>
                  <CheckboxInput
                    type="checkbox"
                    id={`${filter.name}-${value.id}`}
                    value={value.id.toString()}
                    checked={selectedFilters.includes(value.id)}
                    onChange={() => onChange(value.id)}
                  />
                  <label htmlFor={`${filter.name}-${value.id}`}>
                    {value.value}
                  </label>
                </FilterItem>
              ))}
            </ul>
          </div>
        ))}
      </FilterModal>
    </div>
  );
};

export default ProductFilter;
