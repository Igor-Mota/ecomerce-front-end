import { environment } from "@/data/environment";
const today = new Date();

export const productSerializer = (payload) => {
  let data = payload;

  if (Array.isArray(payload.data)) {
    data.data = payload.data.map((product) => serializer(product));
  }

  if (!("data" in payload) && !Array.isArray(payload)) data.data = serializer(payload);

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
  if (product.end_promotion) countTime = new Date(product.end_promotion).toISOString();

  const startPromotion = product.start_promotion ? new Date(product.start_promotion) : null;
  const end_promotion = product.end_promotion ? new Date(product.endPromotion) : null;
  let inPromotion = false;
  if (startPromotion && end_promotion) {
    if (startPromotion.getTime() < today.getTime() || end_promotion > today.getTime()) {
      inPromotion = true;
    }
  }

  let category = "";

  const sizes = [];
  const colors = [];
  const subCategories = [];

  if (product.tag_size) {
    sizes.push(product.tag_size.name);
  }

  if (product.categories) {
    category = product.categories[0] ? product.categories[0].category.name : "";
    if (product.categories[0]) {
      const { Product_Sub_Categories } = product.categories[0];
      Product_Sub_Categories.forEach((sub) => {
        subCategories.push(sub.sub_category.name);
      });
    }
  }

  if (product.color) {
    const index = colors.findIndex((c) => c.name === product.color.name);
    if (index === -1) {
      colors.push({
        color: product.color.code,
        name: product.color.name,
        image: product.images[0] ? `${environment.API_STORE}/${product.images[0].url}` : "",
      });
    }
  }

  if (product.variant) {
    product.variant.forEach((variant) => {
      if (variant.tag_size && !sizes.includes(variant.tag_size.nam)) {
        sizes.push(`${environment.API_STORE}/${variant.images[0].url}/${variant.images[0]}`);
      }

      if (variant.color) {
        const index = colors.findIndex((c) => c.name === variant.color.name);

        if (index === -1) {
          colors.push({
            color: variant.color.code,
            name: variant.color.name,
            image: variant.images[0] ? `${environment.API_STORE}/${variant.images[0].url}` : "",
          });
        }
      }
    });
  }

  return {
    id: product.id,
    title: product.name,
    CountTime: countTime,
    thumbnail: thumb,
    thumb,
    gallery: product.images.map((image) => `${environment.API_STORE}/${image.url}`),
    hoverThumbnail: hoverThumb,
    pCate: subCategories,
    cate: category,
    inPromotion,
    price: product.price,
    salePrice: product.promotional_price,
    productType: "variable",
    sizeAttribute: sizes,
    colorAttribute: colors,
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
