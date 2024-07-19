import { useQuery } from "react-query";
import { api } from "./api";
import { queryParamsHelper } from "./helpers/params";

const fetcher = async () => {
  const { data } = await api.get("product", {
    params: queryParamsHelper(),
  });
  return data;
};

export const useGetManyProducts = () => {
  return useQuery({
    queryFn: fetcher,
    queryKey: "get:masny-products",
    refetchOnWindowFocus: false,
    initialData: {
      data: [],
      recordsTotal: 0,
    },
  });
};
