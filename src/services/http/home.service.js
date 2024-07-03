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

const promotionFetcher = async () => {
  const [today, _] = new Date().toISOString().split("T");
  console.log(today);
  const { data } = await api.get("product", {
    params: {
      page: 0,
      offset: 4,
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

export const useGetHomePromotion = () => {
  return useQuery({
    queryFn: promotionFetcher,
    queryKey: "get:home-promotion",
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};
