import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import cartImage from "../icons/shopping-cart.svg";
import { AiOutlineSwap } from "react-icons/ai";
import { ProductCardProps } from "../interfaces/ProductPageProps";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 303px;
  width: min-content;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
`;

const Price = styled.p`
  font-family: FiraGO;
  font-size: 16px;
  font-weight: 600;
`;

const SplittedPrice = styled.p`
  font-size: 8px;
`;

const PriceElement = styled.span`
  color: red;
  font-weight: bold;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-family: FiraGO;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  max-height: 36px;
  overflow: hidden;
  text-transform: uppercase;
`;

const AddToCard = styled.button`
  width: 110px;
  height: 40px;
  border-radius: 4px;
  background-color: #f28f6a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  border: none;
`;

const AddText = styled.span`
  font-family: FiraGO;
  font-size: 12px;
  font-weight: 600;
`;

const Swap = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    justify-content: space-evenly;
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const splitedPrice = Math.round((product.price * 2.5) / 100);
  const [isAdded, setIsAdded] = useState("დამატება");
  const addedToCart = () => {
    setIsAdded("დამატებულია");
  };
  return (
    <Card>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={160}
        height={160}
        priority
      />
      {product.price > 30 ? (
        <SplittedPrice>
          თვეში: <PriceElement>{splitedPrice}</PriceElement> ₾-დან
        </SplittedPrice>
      ) : (
        <SplittedPrice></SplittedPrice>
      )}

      <ProductContent>
        <Price>₾{product.price.toFixed(2)}</Price>
        <ProductName>{product.name}</ProductName>
      </ProductContent>
      <CartContainer>
        <Swap>
          <AiOutlineSwap />
        </Swap>

        <AddToCard>
          {isAdded === "დამატება" ? (
            <>
              <Image src={cartImage} alt="button-icon" width={14} height={14} />
              <AddText onClick={addedToCart}>{isAdded}</AddText>
            </>
          ) : (
            <AddText onClick={addedToCart}>{isAdded}</AddText>
          )}
        </AddToCard>
      </CartContainer>
    </Card>
  );
};

export default ProductCard;
