import { useQuery } from "react-query";
import { api } from "./api";

export const productFetcher = (id) => {
  return async () => {
    const { data } = await api.get(`product/${id}`, {
      params: {
        page: 0,
        offset: 6,
      },
    });
    return data;
  };
};

export const useGetProductById = (id) => {
  return useQuery({
    queryFn: productFetcher(id),
    queryKey: "get:product-by-id",
    initialData: {},
  });
};
