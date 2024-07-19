"use client";
import { useReducer } from "react";
import Section from "@/components/elements/Section";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import { useGetManyProducts } from "@/services/http/many.products";
import { useGetTags } from "@/services/http/tags";
import Skelleton from "react-loading-skeleton";
import { useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/searchParams";

import {
  initialState,
  shopReducer,
  changeFilterCategory,
  changeFilterSizer,
  clearFilters,
  changePage,
  appendProducts,
  resetProducts,
  resetPage,
  changeFilterColor,
} from "./reducer";

const ShopWithSidebar = ({}) => {
  const { data: tags, isLoading: tagsLoad, isRefetching: tagRefetch } = useGetTags();
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const urlSearchParams = useSearchParams();

  const color = urlSearchParams.get("color") ?? "";
  const size = urlSearchParams.get("size") ?? "";
  const category = urlSearchParams.get("category") ?? "";

  const {
    data,
    isLoading: productIsLoad,
    isRefetching: productRefetching,
    refetch,
  } = useGetManyProducts();

  const reset = async () => {
    dispatch(resetPage);
    await refetch();
    dispatch(resetProducts());
    dispatch(appendProducts(data.data));
    createUrl().clearAll().push();
    createUrl().push("page", 0);
  };

  if (state.page === 1 && state.products.length === 0 && data.data.length > 0) {
    dispatch(appendProducts(data.data));
  }

  const getNextPage = async () => {
    if (state.products.length >= Number(data.recordsTotal)) return;
    dispatch(changePage());
    await refetch();
    dispatch(appendProducts(data.data));
  };

  const filterByCategories = (name) => {
    dispatch(changeFilterCategory(slugify(name)));
    createUrl().push("category", name);
    reset();
  };

  const filterByColors = (name) => {
    createUrl().push("color", name);
    dispatch(changeFilterColor(name));
    reset();
  };

  const filterBySize = async (name) => {
    dispatch(changeFilterSizer(slugify(name)));

    reset();
  };

  const resetFilters = async () => {
    createUrl().clearAll().push();
    if (state.category.trim() === "" && state.size.trim() === "" && state.color.trim() === "")
      return;
    dispatch(clearFilters());
    reset();
  };

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Section pClass="axil-shop-area">
      <div className="row">
        <div className="col-lg-3">
          <div className="axil-shop-sidebar">
            <div className="d-lg-none">
              <button className="sidebar-close filter-close-btn">
                <i className="fas fa-times" />
              </button>
            </div>
            {/* Category Filter */}
            <div
              className={`toggle-list product-categories ${state.categoryToggle ? "active" : ""}`}
            >
              <h6 onClick className="title">
                CATEGORIES
              </h6>
              {state.categoryToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.categories.map((data, index) => (
                      <li
                        className={
                          slugify(state.category) === slugify(data.cate) ? "current-cat" : ""
                        }
                        key={index}
                      >
                        <button onClick={() => filterByCategories(data.cate)}>{data.cate}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={`toggle-list product-color ${state.colorToggle ? "active" : ""}`}>
              <h6 className="title">COLORS</h6>
              {state.colorsToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.colors.map((data, index) => (
                      <li
                        className={slugify(state.color) === slugify(data.name) ? "chosen" : ""}
                        key={index}
                      >
                        <button
                          onClick={() => filterByColors(data.name)}
                          style={{ backgroundColor: `${data.code}` }}
                        ></button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Size Filter  */}
            <div className={`toggle-list product-size ${state.sizesToggle ? "active" : ""}`}>
              <h6 className="title">SIZE</h6>
              {state.sizesToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.sizes.map((data, index) => (
                      <li
                        className={slugify(state.size) === slugify(data.name) ? "chosen" : ""}
                        key={index}
                      >
                        <button onClick={() => filterBySize(data.name)}>{data.name}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="axil-btn btn-bg-primary" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row row--15">
            {!!productIsLoad &&
              skeletons.map((_) => {
                return (
                  <div className="col-xl-4 col-sm-6" key={data.id}>
                    <Skelleton height={220} width={200} />
                  </div>
                );
              })}

            {!productIsLoad && state.products.length > 0 ? (
              state.products.map((data) => (
                <div className="col-xl-4 col-sm-6" key={data.id}>
                  <ProductOne product={data} pClass="mb--30" />
                </div>
              ))
            ) : (
              <h4 className="text-center pt--30">No Product Found</h4>
            )}
          </div>
          <div className="text-center pt--20">
            {!productRefetching && (
              <button
                className={`axil-btn btn-bg-lighter btn-load-more ${
                  data && data.data && data.data.length >= Number(data.recordsTotal)
                    ? "disabled"
                    : ""
                }`}
                onClick={getNextPage}
              >
                {data && data.data && data.data.length >= data.recordsTotal
                  ? "No More Data"
                  : "Load more"}
              </button>
            )}
            {productRefetching && <Skelleton height={50} width={220} />}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ShopWithSidebar;
