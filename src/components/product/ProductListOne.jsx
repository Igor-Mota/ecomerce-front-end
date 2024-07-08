import ProductPrice from "./elements/ProductPrice";
import ProductThumbnail from "./elements/ProductThumbnail";
import ProductTitle from "./elements/ProductTitle";
import ProductRating from "./elements/ProductRating";
import ActionButtons from "./elements/ActionButtons";
import { environment } from "@/data/environment";

const ProductListOne = ({ product }) => {
  return (
    <div className="axil-product-list">
      <ProductThumbnail
        productThumb={product}
        width={240}
        heigh={240}
        discountLabel
        isHoverThumbnail
        src={`${environment.API_STORE}/${product.images[0].url}`}
      />
      <div className="product-content">
        <ProductRating rating={product} />
        <ProductTitle productTitle={product} titleTag="h6" />
        <ProductPrice price={product} />
        <ActionButtons productAction={product} wishlistBtn cartBtn />
      </div>
    </div>
  );
};

export default ProductListOne;
