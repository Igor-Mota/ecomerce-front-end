'use client';
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SlickSlider from "@/components/elements/SlickSlider";
import { addToCart, addToWishlist } from "@/store/slices/productSlice";
import ProductRating from "@/components/product/elements/ProductRating";

const SingleLayoutFour = ({singleData}) => {
    const dispatch = useDispatch();
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const [quantity, setquantity] = useState(1);
    const [colorImage, setColorImage] = useState("");
    const [productSize, setProductSize] = useState("");
    const getWishlist = useSelector((state) => state.productData.wishlistItems);
    const isWishlistAdded = getWishlist.filter((data) => data.id === singleData.id);

    const colorImageHandler = (color) => {
        setColorImage(color);
    }
    const productSizeHandler = (size) => {
        setProductSize(size);
    }
    const decrementQuantity = () => {
        if (quantity > 0) {
            setquantity(quantity - 1);
        }
    }
    const incrementQuantity = () => {
        setquantity(quantity + 1);
    }
    const handleAddToCart = (cartAddedData) => {
        let product = {...cartAddedData}

        if (quantity > 0) {
            product.cartQuantity = quantity;
            product.productColor = colorImage.color;
            product.productSize = productSize;
            dispatch(addToCart(product));
        }else {
            alert("Please select minimum 1 quantity")
        }
    }
    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    }

    return ( 
        <div className="axil-single-product-area bg-color-white">
            <div className="single-product-thumb axil-section-gap pb--20 pb_sm--0 bg-vista-white">
                <div className="container">
                    <div className="row row--50">
                        <div className="col-lg-6 mb--40">
                            <div className="row">
                                <div className="col-lg-12">
                                    <SlickSlider
                                        class="product-large-thumbnail-2 single-product-thumbnail axil-product slick-layout-wrapper--15 axil-slick-arrow arrow-both-side-3"
                                        slidesToShow={1}
                                        infinite={false}
                                        draggable={false}
                                        focusOnSelect={true}
                                        adaptiveHeight={true}
                                        asNavFor={nav2}
                                        ref={(slider1 => setNav1(slider1))}
                                    >
                                        {singleData.gallery ? singleData.gallery.map((galleryImg, index) => (
                                            <div className="thumbnail" key={index}>
                                                <Image
                                                    src={galleryImg}
                                                    height={584}
                                                    width={584}
                                                    alt="Gallery Image"
                                                />
                                            </div>
                                        )) :
                                            <div className="thumbnail">
                                                <Image
                                                    src={singleData.thumbnail}
                                                    height={584}
                                                    width={584}
                                                    alt="Gallery Image"
                                                />
                                            </div>
                                        }
                                    </SlickSlider>
                                </div>
                                <div className="col-lg-12">
                                    <SlickSlider
                                        class="small-thumb-wrapper product-small-thumb-2 small-thumb-style-two small-thumb-style-three"
                                        slidesToShow={6}
                                        infinite={false}
                                        draggable={false}
                                        focusOnSelect={true}
                                        asNavFor={nav1}
                                        ref={(slider2 => setNav2(slider2))}
                                    >
                                        {singleData.gallery ? singleData.gallery.map((galleryImg, index) => (
                                            <div className="small-thumb-img" key={index}>
                                                <Image
                                                    src={galleryImg}
                                                    height={207}
                                                    width={213}
                                                    alt="Thumb Image"
                                                />
                                            </div>
                                        )) :
                                            <div className="small-thumb-img">
                                                <Image
                                                    src={singleData.thumbnail}
                                                    height={207}
                                                    width={213}
                                                    alt="Thumb Image"
                                                />
                                            </div>}
                                    </SlickSlider>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb--40">
                            <div className="single-product-content">
                                <div className="inner">
                                    <h2 className="product-title">{singleData.title}</h2>
                                    <span className="price-amount">${singleData.salePrice ? singleData.salePrice : singleData.price}</span>
                                    <ProductRating rating={singleData} textEnable/>
                                    {singleData.shortDes && 
                                        <>
                                        <ul className="product-meta" dangerouslySetInnerHTML={{ __html: singleData.shortDes.listItem }}></ul>
                                        <p>{singleData.shortDes.text}</p>
                                        </>
                                    }
                                    <div className="product-variations-wrapper">
                                        {singleData.colorAttribute &&
                                            <div className="product-variation">
                                                <h6 className="title">Colors:</h6>
                                                <div className="color-variant-wrapper">
                                                    <ul className="color-variant">
                                                        {singleData.colorAttribute?.map((data, index) => (
                                                            <li className={`${data.color} ${colorImage.color === data.color ? "active" : ""
                                                                }`} key={index} onClick={() => colorImageHandler(data)}>
                                                                <span>
                                                                    <span className="color" />
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        {singleData.sizeAttribute &&
                                            <div className="product-variation product-size-variation">
                                                <h6 className="title">Size:</h6>
                                                <ul className="range-variant">
                                                    {singleData.sizeAttribute?.map((data, index) => (
                                                        <li key={index} className={productSize === data ? "active" : ""}
                                                        onClick={() => productSizeHandler(data)}>{data}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className="product-action-wrapper d-flex-center">
                                        <div className="pro-qty">
                                            <span className="qtybtn" onClick={decrementQuantity}>-</span>
                                            <input type="number" className="quantity-input" value={quantity} readOnly />
                                            <span className="qtybtn" onClick={incrementQuantity}>+</span>
                                        </div>
                                        <ul className="product-action d-flex-center mb--0">
                                            <li className="add-to-cart">
                                                <button disabled={(singleData.colorAttribute && !colorImage) || (singleData.sizeAttribute && !productSize) ? true : false} onClick={() => handleAddToCart(singleData)} className="axil-btn btn-bg-primary">Add to Cart</button>
                                            </li>
                                            <li className="wishlist">
                                                <button className="axil-btn wishlist-btn" onClick={() => handleAddToWishlist(singleData)}><i className={isWishlistAdded.length === 1 ? "fas fa-heart" : "far fa-heart"} /></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product-desc-wrapper pt--80 pt_sm--60">
                                        <h4 className="primary-color mb--40 desc-heading">Description</h4>
                                            {Array.isArray(singleData.description.textDesc) && singleData.description.textDesc?.map((data, index) => (
                                                <div className={`single-desc ${singleData.description.textDesc[index + 1] ? "mb--30": ""}`} key={index}>
                                                    <h5 className="title">{data.title}</h5>
                                                    <p>{data.text}</p>
                                                </div>
                                            ))}
                                        <ul className="pro-des-features pro-desc-style-two">
                                            {singleData.description.listDesc?.map((data, index) => (
                                                <li className="single-features" key={index}>
                                                    <div className="icon">
                                                        <Image
                                                            src={data.icon}
                                                            width={30}
                                                            height={34}
                                                            alt="icon"
                                                        />
                                                    </div>
                                                    {data.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SingleLayoutFour;