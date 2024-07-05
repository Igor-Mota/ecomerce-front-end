import { useMutation } from "react-query";
import { api } from "./api";

const loginFetcher = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });
    return { data };
  } catch (err) {}
};

const registerFetcher = async (email, password) => {
  try {
    const { data } = await api.post("/auth/register", {
      email,
      password,
    });
    return { data };
  } catch (err) {}
};

export const loginMutation = () => {
  return useMutation({
    mutationKey: "post:login",
    mutationFn: loginFetcher,
  });
};

export const registerMutation = () => {
  return useMutation({
    mutationKey: "post:login",
    mutationFn: registerFetcher,
  });
};
