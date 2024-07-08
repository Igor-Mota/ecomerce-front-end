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
    provider: user.provider,
    avatar: user.client.avatar ?? "/images/product/author1.png",
    joinDate: new Date(user.created_at).toISOString().split("T")[0],
    shippingAddress: user.client.addresses
      ? user.client.addresses.map((address, index) => {
          if (index === 0) {
            return {
              id: address.id,
              name: user.client.userName,
              email: user.email,
              phone: user.client.phone,
              street: address.address,
              state: address.state,
              city: address.city,
              postCode: address.zip_code,
              country: "Brazil",
            };
          }
        })[0]
      : null,

    billingAddress: user.client.addresses
      ? user.client.addresses.map((address, index) => {
          if (index === 1) {
            return {
              id: address.id,
              name: user.client.username,
              email: user.email,
              phone: user.client.phone,
              street: address.address,
              state: address.state,
              city: address.city,
              postCode: address.zip_code,
              country: "Brazil",
            };
          }
        })[1]
      : null,
  };
};