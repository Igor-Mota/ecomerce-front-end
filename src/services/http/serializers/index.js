import { environment } from "@/data/environment";
import { productSerializer } from "./product";
import { userSerializer } from "./user";
import { orderSerializer } from "./order";
import { tagsSerializer } from "./tags";

export const serializers = (payload, url) => {
  const path = url.replace(environment.API_URL, "");
  let data = payload;

  if (path.startsWith("/product")) data = productSerializer(data);
  if (path.startsWith("/auth/login")) data = userSerializer(data);
  if (path.startsWith("/auth/me")) data = userSerializer(data);
  if (path.startsWith("/order")) data = orderSerializer(data);
  if (path.startsWith("/tags")) data = tagsSerializer(data);

  return data;
};
