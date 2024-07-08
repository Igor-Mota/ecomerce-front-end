import { useMutation } from "react-query";
import { api } from "./api";

export const createAddressFetcher = async (payload) => {
  try {
    const { data } = await api.post("/address", payload);
    return data;
  } catch (err) {
    return err;
  }
};

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: createAddressFetcher,
    mutationKey: "post:create-address",
  });
};
