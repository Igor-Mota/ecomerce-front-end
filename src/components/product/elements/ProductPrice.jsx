const ProductPrice = ({ inPromotion, price, salePrice }) => {
  return (
    <div className="product-price-variant">
      {inPromotion ? (
        <span className="price old-price">
          <span className="currency-symbol">$</span>
          {price}
        </span>
      ) : (
        ""
      )}
      <span className="price current-price">
        <span className="currency-symbol">$</span>
        {inPromotion ? salePrice : price}
      </span>
    </div>
  );
};

export default ProductPrice;
