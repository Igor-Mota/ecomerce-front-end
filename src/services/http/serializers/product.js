import { environment } from "@/data/environment";

export const productSerializer = (payload) => {
  let data = payload;

  if (Array.isArray(payload.data)) {
    data.data = payload.data.map((product) => serializer(product));
  }

  if (!("data" in payload) && !Array.isArray(payload))
    data = serializer(payload);

  return data;
};

const serializer = (product) => {
  let thumb = "/images/product/product-big-03.png";
  let hoverThumb = [
    "/images/product/product-big-01.png",
    "/images/product/product-big-02.png",
    "/images/product/product-big-03.png",
    "/images/product/product-big-02.png",
  ];
  let countTime = undefined;
  if (product.images[0]) {
    thumb = `${environment.API_STORE}/${product.images[0].url}`;
  }
  if (product.images.length > 1) hoverThumb = product.images.slice(1);
  if (product.end_promotion)
    countTime = new Date(product.end_promotion).toISOString();

  return {
    id: product.id,
    title: product.name,
    CountTime: countTime,
    thumbnail: thumb,
    thumb,
    gallery: product.images.map(
      (image) => `${environment.API_STORE}/${image.url}`,
    ),
    hoverThumbnail: hoverThumb,
    pCate: "Electronics",
    cate: ["Headphones", "Computers"],
    price: product.price,
    salePrice: product.promotional_price,
    productType: "variable",
    sizeAttribute: ["XL", "L", "M", "S", "XS"],
    colorAttribute: [
      {
        color: "red",
        img: "/images/product/product-big-03.png",
      },
      {
        color: "black",
        img: "/images/product/product-big-02.png",
      },
      {
        color: "skyblue",
        img: "/images/product/product-big-01.png",
      },
    ],
    shortDes: {
      text: product.description_small,
      listItem:
        '<li><i class="fal fa-check"></i>In stock</li><li><i class="fal fa-check"></i>Free delivery available</li><li><i class="fal fa-check"></i>Sales 30% Off Use Code: MOTIVE30</li>',
    },
    description: {
      textDesc: [
        {
          title: "Specifications:",
          text: product.description,
        },
      ],
      listDesc: [],
    },
  };
};
