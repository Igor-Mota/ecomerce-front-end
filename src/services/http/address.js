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

export const updateAddressFetcher = async (payload) => {
  const { id, ...rest } = payload;
  try {
    const { data } = await api.patch(`/address/${id}`, rest);
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

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: updateAddressFetcher,
    mutationKey: "put:update-address",
  });
};
