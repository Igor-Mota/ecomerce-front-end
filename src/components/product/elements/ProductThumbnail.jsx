import Link from "next/link";
import Image from "next/image";
import ProductDiscountLabel from "./ProductDiscountLabel";
import ActionButtons from "./ActionButtons";

const ProductThumbnail = (props) => {
  return (
    <div className="thumbnail" style={{ width: "255px", height: "191px" }}>
      <Link href={`/products/${props.productThumb.id}`}>
        <Image
          src={props.attributeImg ? props.attributeImg : props.productThumb.thumbnail}
          width={props.width ?? 255}
          height={props.height ?? 190}
          alt={props.productThumb.title}
          style={{ width: "255px !important", height: "190 !important", objectFit: "cover" }}
        />
        {props.productThumb.hoverThumbnail && props.isHoverThumbnail ? (
          <Image
            src={props.productThumb.hoverThumbnail}
            width={props.width ?? 255}
            height={props.height ?? 190}
            alt={props.productThumb.title}
            className="hover-img"
            style={{ width: "255px !important", height: "190 !important", objectFit: "cover" }}
          />
        ) : (
          ""
        )}
      </Link>
      {props.inPromotion && props.productThumb.salePrice && props.discountLabel && (
        <ProductDiscountLabel discount={props.productThumb} />
      )}
      {props.hoverItems && (
        <div className="product-hover-action">
          <ActionButtons
            productAction={props.productThumb}
            wishlistBtn={props.wishlistBtn}
            cartBtn={props.cartBtn}
            quickViewBtn={props.quickViewBtn}
          />
        </div>
      )}
    </div>
  );
};

export default ProductThumbnail;
