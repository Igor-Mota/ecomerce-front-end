import { useQuery } from "react-query";
import { api } from "./api";

const fetcher = (page, offset) => {
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

export const useGetManyProducts = (page, offset) => {
  return useQuery({
    queryFn: fetcher(page, offset),
    queryKey: "get:many-products",
    getNextPageParam: "page",
    keepPreviousData: true,
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};
