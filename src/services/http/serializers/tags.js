export const tagsSerializer = (payload) => {
  let data = payload;

  if (payload && payload.categories && payload.categories.categories) {
    data.categories = serializerCategories(payload.categories.categories);
  }

  if (payload && payload.colors) {
    data.colors = serializeColors(payload.colors);
  }

  if (payload && payload.tag_sizes) {
    data.sizes = sizeSerializer(payload.tag_sizes);
  }

  return data;
};

const serializerCategories = (categoroies) => {
  return categoroies.map((category) => {
    return {
      id: category.id,
      cate: category.name,
      hasSub: true,
      subCate: [],
    };
  });
};

const serializeColors = (colors) => {
  return colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      code: color.code,
    };
  });
};

const sizeSerializer = (sizes) => {
  return sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
    };
  });
};
