import { createContext, useContext } from "react";
import { useGetTags } from "@/services/http/tags";

export const TagsContext = createContext(null);

export const TagsProvider = ({ children }) => {
  const { data, isLoading } = useGetTags();

  return <TagsContext.Provider value={{ data, isLoading }}>{children}</TagsContext.Provider>;
};

export const useTagsContext = () => {
  const { data, isLoading } = useContext(TagsContext);
  return { data, isLoading };
};
