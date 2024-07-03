"use client";
import { useState } from "react";
import ProductPrice from "./elements/ProductPrice";
import ProductColorAttribute from "./elements/ProductColorAttribute";
import ProductThumbnail from "./elements/ProductThumbnail";
import ProductTitle from "./elements/ProductTitle";
import { environment } from "@/data/environment";

const ProductOne = ({ product, pClass }) => {
  const [colorAttribute, setColorAttribute] = useState("");

  const getAttributeData = (data) => {
    setColorAttribute(data.img);
  };

  return (
    <>
      <div className={`axil-product product-style-one ${pClass ?? ""}`}>
        <ProductThumbnail
          src={`${environment.API_STORE}/${product.images[0].url}`}
          attributeImg={colorAttribute}
          discountLabel
          hoverItems
          wishlistBtn
          cartBtn
          quickViewBtn
        />
        <div className="product-content">
          <div className="inner">
            {/* <ProductTitle verified={product.verified} productTitle={product} />
            <ProductPrice price={product.price} /> */}
            {/* {product.colorAttribute && (
              <ProductColorAttribute
                attributeColor={product}
                getAttribute={getAttributeData}
              />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOne;
