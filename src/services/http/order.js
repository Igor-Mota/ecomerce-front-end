import { api } from "./api";
import { useMutation, useQuery } from "react-query";

const getOrdersFetcher = async () => {
  try {
    const { data } = await api.get("/order");
    return data;
  } catch (err) {
    return err;
  }
};

const createOrderFetcher = async () => {
  try {
    const { data } = await api.post("/order");
    return { data };
  } catch (err) {
    return err;
  }
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: "get:orders",
    queryFn: getOrdersFetcher,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: "post:create-order",
    mutationFn: createOrderFetcher,
  });
};
