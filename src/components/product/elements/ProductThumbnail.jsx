import Link from "next/link";
import Image from "next/image";
import ProductDiscountLabel from "./ProductDiscountLabel";
import ActionButtons from "./ActionButtons";

const ProductThumbnail = ({ src, alt, id, noImage, price, ...props }) => {
  return (
    <div className="thumbnail">
      <Link href={`/products/${id}`}>
        <Image
          src={src ? src : noImage}
          width={props.width ?? 300}
          height={props.height ?? 300}
          alt={props.name}
        />
        {src && props.isHoverThumbnail ? (
          <Image
            src={src}
            width={props.width ?? 300}
            height={props.height ?? 300}
            alt={props.name}
            className="hover-img"
          />
        ) : (
          ""
        )}
      </Link>
      {price && props.discountLabel && (
        <ProductDiscountLabel discount={props.price} />
      )}
      {props.hoverItems && (
        <div className="product-hover-action">
          {/* <ActionButtons
            productAction={props.price}
            wishlistBtn={props.wishlistBtn}
            cartBtn={props.cartBtn}
            quickViewBtn={props.quickViewBtn}
          /> */}
        </div>
      )}
    </div>
  );
};

export default ProductThumbnail;
