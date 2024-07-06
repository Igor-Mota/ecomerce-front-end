import { api } from "./api";

export const updateUser = async (payload) => {
  try {
    const { data } = await api.put("client", payload);
    return data;
  } catch (err) {
    return err;
  }
};
