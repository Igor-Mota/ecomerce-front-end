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
  const { data } = await api.get("product", {
    params: {
      page: 0,
      offset: 4,
    },
  });
  return data;
};

const arrivalsFetcher = async () => {
  const { data } = await api.get("product", {
    params: {
      page: 0,
      offset: 3,
      last: true,
    },
  });
  return data;
};

const mostSoldFetcher = async () => {
  const { data } = await api.get("product", {
    params: {
      page: 0,
      offset: 2,
      mostSold: true,
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

export const useGetArrivals = () => {
  return useQuery({
    queryFn: arrivalsFetcher,
    queryKey: "get:home-arrivals",
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};

export const useGetMostSold = () => {
  return useQuery({
    queryFn: mostSoldFetcher,
    queryKey: "get:home-most-sold",
    initialData: {
      data: [],
      totalRecords: 0,
    },
  });
};
