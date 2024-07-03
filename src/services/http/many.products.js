import { useQuery } from "react-query";
import { api } from "./api";

const fetcher = (page, offset = 9) => {
  return async () => {
    const { data } = await api.get("product", {
      params: {
        page,
        offset,
      },
    });
    return data;
  };
};

export const useGetManyProducts = (offset) => {
  return useQuery({
    queryFn: fetcher(0, offset),
    queryKey: "get:many-products",
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};
