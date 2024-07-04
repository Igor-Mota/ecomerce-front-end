import axios from "axios";
import { QueryClient } from "react-query";
import { environment } from "@/data/environment";
import { serializers } from "./serializers";

const api = axios.create({
  baseURL: environment.API_URL,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    const { data, ...rest } = response;
    const serialized = serializers(data, rest.request.responseURL);
    return {
      data: serialized,
      ...rest,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient();

export { api, queryClient };
