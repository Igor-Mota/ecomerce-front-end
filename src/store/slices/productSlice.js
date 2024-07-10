import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { calculateTotalAmount, calculateTotalQuantity } from "@/utils";

const cartPersistence = (state) => {
  window.localStorage.removeItem('cartItems')
  window.localStorage.removeItem('cartTotalAmount')
  window.localStorage.removeItem('cartQuantityTotal')

  window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  window.localStorage.setItem('cartTotalAmount', calculateTotalAmount(state.cartItems))
  window.localStorage.setItem('cartQuantityTotal', state.cartQuantityTotal)
}

const initialPersistent = (key, notfounded, parse = false) => {

  if(!!window && window.localStorage.getItem(key)){
    if(parse) return JSON.parse(window.localStorage.getItem(key))
      return localStorage.getItem(key)
    }

    return notfounded
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    cartItems: initialPersistent("cartItems", [], true),
    cartQuantityTotal: initialPersistent('cartQuantityTotal', 0),
    cartTotalAmount: initialPersistent('cartTotalAmount', 0),
    wishlistItems: [],
    wishListQuantity: 0,
    quickView: false,
    quickViewItems: null,
    isMinicartOpen: false,
    orderItems: [],
  },
  reducers: {
    addToCart(state, action) {

      const ItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (ItemIndex >= 0) {
        state.cartItems[ItemIndex].cartQuantity += action.payload.cartQuantity ?? 1;
        state.cartQuantityTotal += action.payload.cartQuantity ?? 1;
        state.isMinicartOpen = true;
      } else {
        const tempProduct = {
          id: action.payload.id,
          title: action.payload.title,
          thumbnail: action.payload.thumbnail,
          salePrice: action.payload.salePrice ?? 0,
          price: action.payload.price,
          productType: action.payload.productType,
          cartQuantity: action.payload.cartQuantity ?? 1,
          productSize: action.payload.productSize ?? "",
          productColor: action.payload.productColor ?? "",
        };
        state.cartItems.push(tempProduct);
        state.cartQuantityTotal += action.payload.cartQuantity ?? 1;
        state.isMinicartOpen = true;
      
      }

      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      cartPersistence(state)

    },
    removeCartItem(state, action) {
      const filteredCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      const filteredItemQuantity = filteredCartItem.map((item) => {
        return item.cartQuantity;
      });
      state.cartQuantityTotal = filteredItemQuantity.length;
      state.cartItems = filteredCartItem;
      cartPersistence(state)

    },
    cartQuantityIncrease(state, action) {
      const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[findItem].cartQuantity += 1;
    },
    cartQuantityDecrease(state, action) {
      const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (state.cartItems[findItem].cartQuantity > 1) {
        state.cartItems[findItem].cartQuantity -= 1;
      }
      cartPersistence()
    },
    cartClear(state, action) {
      state.cartItems = [];
      state.cartQuantityTotal = 0;
      cartPersistence(state)
    },
    updateCartAmount(state, action) {
      state.cartTotalAmount = calculateTotalAmount(state.cartItems);
      state.cartQuantityTotal = calculateTotalQuantity(state.cartItems);
      cartPersistence(state)
    },
    addToWishlist(state, action) {
      const ItemIndex = state.wishlistItems.findIndex((item) => item.id === action.payload.id);
      if (ItemIndex >= 0) {
        Swal.fire({
          title: action.payload.title,
          text: "You already Added the item",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      } else {
        state.wishlistItems.push(action.payload);
        state.wishListQuantity += 1;
        Swal.fire({
          title: action.payload.title,
          text: "Added to your Wishlist",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    },
    removeWishlistItem(state, action) {
      const filteredWishlistItem = state.wishlistItems.filter(
        (wishlistItem) => wishlistItem.id !== action.payload.id
      );
      state.wishlistItems = filteredWishlistItem;
      state.wishListQuantity = state.wishlistItems.length;
    },
    addToQuickView(state, action) {
      state.quickView = action.payload.quickView;
      state.quickViewItems = action.payload.viewItem;
    },
    miniCartHandler(state, action) {
      state.isMinicartOpen = action.payload;
      if (state.quickView === true) {
        state.quickView = false;
      }
    },
    addToOrder(state, action) {
      state.orderItems.push(action.payload);
      state.cartQuantityTotal = 0;
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  addToWishlist,
  removeWishlistItem,
  addToQuickView,
  removeCartItem,
  cartQuantityIncrease,
  cartQuantityDecrease,
  cartClear,
  updateCartAmount,
  miniCartHandler,
  addToOrder,
} = productSlice.actions;

export default productSlice.reducer;
