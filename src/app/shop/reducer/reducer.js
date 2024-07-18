import { actions } from "./actions";

export const initialState = {
  products: [],
  recordsTotal: 0,
  category: "",
  color: "",
  size: "",
  page: 0,
  offset: 1,
  categoryToggle: true,
  colorsToggle: true,
  sizesToggle: true,
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_COLOR_FILTERED:
      return { ...state, color: action.payload };
    case actions.CHANGE_CATEGORY_FILTERED:
      return { ...state, category: action.payload };
    case actions.CHANGE_SIZE_FILTERED:
      return { ...state, size: action.payload };
    case actions.CLEAR_FILTERS:
      return { ...initialState };
    case actions.CHANGE_PAGE:
      return { ...state, offset: state.offset + 1 };
    case actions.TOGGLE_CATEGORY:
      return { ...state, categoryToggle: !state.categoryToggle };
    case actions.TOGGLE_COLORS:
      return { ...state, colorsToggle: !state.colorsToggle };
    case actions.TOGGLE_SIZES:
      return { ...state, sizesToggle: !state.sizesToggle };
    case actions.APPEND_PRODUCTS:
      return { ...state, products: [...state.products, ...action.payload] };
    case actions.RESET_PRODUCTS:
      return { ...state, products: [] };
    default:
      return { ...state };
  }
};
