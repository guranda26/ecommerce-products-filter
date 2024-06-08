import axios from "axios";

export const getProducts = async (
  CategoryId: number,
  Page: number,
  Limit: number,
  filters: { filterIds: number[] },
  searchQuery?: string
) => {
  try {
    const params: any = {
      CategoryId,
      Page,
      Limit,
      filterIds: filters.filterIds.join(","),
    };

    if (searchQuery) {
      params.Name = searchQuery;
    }

    const response = await axios.get(
      "https://zoommer-api.lemon.do/v1/Products/v3",
      { params }
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
