export const actions = {
  CHANGE_COLOR_FILTERED: "CHANGE_COLOR_FILTERED",
  CHANGE_SIZE_FILTERED: "CHANGE_SIZE_FILTERED",
  CHANGE_CATEGORY_FILTERED: "CHANGE_CATEGORY_FILTERED",
  CHANGE_FILTERED_PRICE: "CHANGE_FILTERED_PRICE",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  CHANGE_PAGE: "CHANGE_PAGE",
  RESET_PAGE: "RESET_PAGE",
  TOGGLE_CATEGORY: "TOGGLE_CATEGORY",
  TOGGLE_COLORS: "TOGGLE_COLORS",
  TOGGLE_SIZES: "TOGGLE_SIZES",
  APPEND_PRODUCTS: "APPEND_PRODUCTS",
  RESET_PRODUCTS: "RESET_PRODUCTS",
};

export const changeFilterColor = (color) => {
  return { type: actions.CHANGE_COLOR_FILTERED, payload: color };
};
export const changeFilterSizer = (size) => {
  return { type: actions.CHANGE_SIZE_FILTERED, payload: size };
};

export const changeFilterCategory = (category) => {
  return { type: actions.CHANGE_CATEGORY_FILTERED, payload: category };
};

export const changeFilterPrice = (price) => {
  return { type: actions.CHANGE_FILTERED_PRICE, payload: price };
};

export const clearFilters = () => {
  return { type: actions.CLEAR_FILTERS };
};

export const changePage = () => {
  return { type: actions.CHANGE_PAGE };
};

export const toggleCategory = () => {
  return { type: actions.TOGGLE_CATEGORY };
};

export const toggleSizes = () => {
  return { type: actions.TOGGLE_SIZES };
};

export const toggleColors = () => {
  return { type: actions.TOGGLE_COLORS };
};

export const appendProducts = (products) => {
  return { type: actions.APPEND_PRODUCTS, payload: products };
};
export const resetProducts = () => {
  return { type: actions.RESET_PRODUCTS };
};

export const resetPage = () => {
  return { type: actions.RESET_PAGE };
};
