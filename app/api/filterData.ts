import axios from "axios";

export const getFilterData = async (categoryId: number) => {
  try {
    const response = await axios.get(
      `  "https://your-proxy-server.herokuapp.com/api/Content/filter"      `,
      {
        params: {
          catId: categoryId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filter data", error);
    throw error;
  }
};
