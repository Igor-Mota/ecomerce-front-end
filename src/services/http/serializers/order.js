export const orderSerializer = (payload) => {
  console.log(payload);
  let data = payload;

  if (Array.isArray(payload.data)) {
    data.data = payload.data.map((order) => serializer(order));
  }

  if (!("data" in payload) && !Array.isArray(payload)) data = serializer(payload);

  return data;
};

const serializer = (order) => {
  return {};
};
