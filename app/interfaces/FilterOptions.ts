interface FilterOption {
  name: string;
  values: {
    id: number;
    value: string;
  }[];
}

export interface ProductFilterProps {
  categories: FilterOption[];
  selectedFilters: number[];
  onChange: (filterId: number) => void;
}
