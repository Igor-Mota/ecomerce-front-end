import { api } from "./api";
import { useQuery } from "react-query";

const tagsFetcher = async () => {
  try {
    const { data } = await api.get("tags");
    return data;
  } catch (err) {
    return err;
  }
};

export const useGetTags = () => {
  return useQuery({
    queryKey: "get:tags",
    queryFn: tagsFetcher,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    initialData: {
      sizes: [],
      colors: [],
      categories: [],
    },
  });
};
