import { useQuery } from "react-query";
import { api } from "./api";

const fetcher = (id) => {
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
    queryFn: fetcher(id),
    queryKey: "get:product-by-id",
    initialData: {},
  });
};
