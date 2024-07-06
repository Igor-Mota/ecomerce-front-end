export const userSerializer = (payload) => {
  let data = payload;

  if (payload) data = serializer(payload);

  return {
    user: data,
    token: payload.access_token,
  };
};

const serializer = (user) => {
  return {
    id: user.id,
    userName: user.client.username,
    email: user.email,
    phone: user.client.phone,
    name: user.client.userName,
    avatar: user.client.avatar ?? "/images/product/author1.png",
    joinDate: new Date(user.created_at).toISOString().split("T")[0],
    shippingAddress: user.client.address
      ? user.client.address.find((address, index) => {
          if (index === 0) {
            return {
              name: "Hasan AH",
              email: "admin@email.com",
              phone: "1234 567890",
              street: "7398 Smoke Ranch Road",
              state: "Las Vegas",
              city: "Nevada",
              postCode: "89128",
              country: "United States",
            };
          }
        })
      : {},

    billingAddress: user.client.address
      ? user.client.address.find((address, index) => {
          if (index === 1) {
            return {
              name: "Hasan AH",
              email: "admin@email.com",
              phone: "1234 567890",
              street: "7398 Smoke Ranch Road",
              state: "Las Vegas",
              city: "Nevada",
              postCode: "89128",
              country: "United States",
            };
          }
        })
      : {},
  };
};
