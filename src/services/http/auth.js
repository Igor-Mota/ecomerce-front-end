import { useMutation } from "react-query";
import { api } from "./api";

export const loginFetcher = async ({ email, password, token, provider }) => {
  try {
    if (provider === "Default") {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      return { data };
    }
    if (provider === "Google") {
      const { data } = await api.post("/auth/login", {
        email,
        token,
        provider,
      });
      return { data };
    }
  } catch (err) {
    return err;
  }
};

const registerFetcher = async ({ email, password, provider, token }) => {
  try {
    if (provider === "Default") {
      const { data } = await api.post("/auth/register", {
        email,
        password,
        provider,
      });
      return { data };
    }
    if (provider === "Google") {
      const { data } = await api.post("/auth/register", {
        email,
        token,
        provider,
      });
      return { data };
    }
  } catch (err) {
    return err;
  }
};

export const refreshTokenFetcher = async () => {
  try {
    const { data } = await api.get("auth/refreshToken");
    return data;
  } catch (err) {
    return err;
  }
};

export const meFetcher = async () => {
  try {
    const { data } = await api.get("auth/me");
    return data;
  } catch (err) {
    return err;
  }
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
