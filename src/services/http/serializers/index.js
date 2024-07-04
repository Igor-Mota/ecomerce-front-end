import { environment } from "@/data/environment";
import { productSerializer } from "./product";

export const serializers = (payload, url) => {
  const path = url.replace(environment.API_URL, "");
  let data = payload;

  if (path.startsWith("/product")) data = productSerializer(data);

  return data;
};
