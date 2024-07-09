const ProductPrice = ({ price }) => {
  return (
    <div className="product-price-variant">
      {price ? (
        <span className="price old-price">
          <span className="currency-symbol">$</span>
          {price}
        </span>
      ) : (
        ""
      )}
      <span className="price current-price">
        <span className="currency-symbol">$</span>
        {price ? price : ""}
      </span>
    </div>
  );
};

export default ProductPrice;
