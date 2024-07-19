import { useState } from "react";

const ProductColorAttribute = (props) => {
  const [colorImage, setColorImage] = useState("");

  const colorImageHandler = (color) => {
    setColorImage(color);
    props.getAttribute(color);
  };
  console.log(props);
  return (
    <div className="color-variant-wrapper">
      <ul className="color-variant">
        {props.attributeColor.colorAttribute.map((data, index) => (
          <li
            className={` ${colorImage.color === data.color ? "active" : ""}`}
            key={index}
            onClick={() => colorImageHandler(data)}
          >
            <span style={colorImage.color === data.color ? { borderColor: data.color } : {}}>
              <span style={{ background: data.color }} className="color" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductColorAttribute;
