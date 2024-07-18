"use client";
import { useReducer } from "react";
import Section from "@/components/elements/Section";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import { useGetManyProducts } from "@/services/http/many.products";
import { useGetTags } from "@/services/http/tags";
import Skelleton from "react-loading-skeleton";
import {
  initialState,
  shopReducer,
  changeFilterCategory,
  changeFilterColor,
  changeFilterSizer,
  clearFilters,
  changePage,
  toggleCategory,
  toggleColors,
  toggleSizes,
} from "./reducer";

const ShopWithSidebar = ({}) => {
  const { data: tags, isLoading: tagsLoad, isRefetching: tagRefetch } = useGetTags();
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const {
    data,
    refetch,
    isLoading: productIsLoad,
    isRefetching: productRefetching,
  } = useGetManyProducts(state.page, state.offset);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getNextPage = () => {
    dispatch(changePage());
    console.log(state.offset);
    refetch();
  };

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
              <h6 onClick={() => dispatch(toggleCategory())} className="title">
                CATEGORIES
              </h6>
              {state.categoryToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.categories.map((data, index) => (
                      <li
                        className={state.category === slugify(data.cate) ? "current-cat" : ""}
                        key={index}
                      >
                        <button onClick={() => dispatch(changeFilterCategory(slugify(data.cate)))}>
                          {data.cate}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Gender Filter  */}
            {/* <div
              className={`toggle-list product-categories product-gender ${genderToggle ? "active" : ""}`}
            >
              <h6 onClick={() => setgenderToggle(!genderToggle)} className="title">
                GENDER
              </h6>
              {genderToggle && (
                <div className="shop-submenu">
                  <ul>
                    {Gender?.map((data, index) => (
                      <li className={filterText === data ? "chosen" : ""} key={index}>
                        <button onClick={() => genderHandler(data)}>{data}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div> */}
            {/* Color Filter  */}
            <div className={`toggle-list product-color ${state.colorsToggle ? "active" : ""}`}>
              <h6 onClick={() => dispatch(toggleColors())} className="title">
                COLORS
              </h6>
              {state.colorsToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.colors.map((data, index) => (
                      <li
                        className={state.color === slugify(data.name) ? "chosen" : ""}
                        key={index}
                      >
                        <button
                          onClick={() => dispatch(changeFilterColor(slugify(data.name)))}
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
              <h6 onClick={() => dispatch(toggleSizes())} className="title">
                SIZE
              </h6>
              {state.sizesToggle && (
                <div className="shop-submenu">
                  <ul>
                    {tags.sizes.map((data, index) => (
                      <li className={state.size === slugify(data.name) ? "chosen" : ""} key={index}>
                        <button onClick={() => dispatch(changeFilterSizer(slugify(data.name)))}>
                          {data.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Price Filter  */}
            {/* <div className={`toggle-list product-price-range ${priceRangeToggle ? "active" : ""}`}>
              <h6 onClick={() => setpriceRangeToggle(!priceRangeToggle)} className="title">
                PRICE
              </h6>
              {priceRangeToggle && (
                <div className="shop-submenu">
                  <ul>
                    {priceRangeData?.map((data, index) => (
                      <li className={state.category === data ? "chosen" : ""} key={index}>
                        <button onClick={() => priceRangeHandler(data)}>{data}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div> */}
            <button className="axil-btn btn-bg-primary" onClick={() => dispatch(clearFilters())}>
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

            {!productIsLoad && data && data.data && data.data.length > 0 ? (
              data.data.map((data) => (
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
