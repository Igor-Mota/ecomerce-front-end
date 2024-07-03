import { useQuery } from "react-query";
import { api } from "./api";

const fetcher = async () => {
  const { data } = await api.get("product", {
    params: {
      page: 0,
      offset: 6,
    },
  });

  return data;
};

export const useGetHomeProducts = () => {
  return useQuery({
    queryFn: fetcher,
    queryKey: "get:home-products",
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};
