import { environment } from "@/data/environment";
import { productSerializer } from "./product";
import { userSerializer } from "./user";

export const serializers = (payload, url) => {
  const path = url.replace(environment.API_URL, "");
  let data = payload;

  if (path.startsWith("/product")) data = productSerializer(data);
  if (path.startsWith("/auth/login")) data = userSerializer(data);
  if (path.startsWith("/auth/me")) data = userSerializer(data);

  return data;
};
