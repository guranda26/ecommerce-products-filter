export interface ProductPageProps {
  searchQuery: string;
  filterOptions: any[];
}

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}
