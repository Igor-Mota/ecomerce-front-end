"use client";

import { useParams } from "next/navigation";
import SlickSlider from "@/components/elements/SlickSlider";
import SingleLayouThree from "./SingleLayouThree";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";
import { useGetProductById } from "@/services/http/product.byId";

const ProductDetails = ({ params }) => {
  const { id } = useParams();

  const { data, isLoading } = useGetProductById(id);

  if (!!isLoading) return <p>Carregando...</p>;

  console.log(data);

  const ProductSingleLayout = () => {
    switch ("NFT") {
      case "NFT":
        return <SingleLayouSeven singleData={data} />;
        break;
      case "Electronics":
        return <SingleLayouThree singleData={data} />;
        break;
      case "Fashion":
        return <SingleLayoutOne singleData={data} />;
        break;
      case "Furniture":
        return <SingleLayoutFour singleData={data} />;
        break;
      default:
        return <> </>;
        break;
    }
  };

  return (
    <>
      <ProductSingleLayout />
      <Section pClass="pb--50 pb_sm--30">
        <SectionTitle
          title="Viewed Items"
          subtitle="Your Recently"
          subtitleIcon="far fa-shopping-basket"
          subColor="highlighter-primary"
        />
        <SlickSlider
          class="recent-product-activation slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
          slidesToShow={4}
          infinite={false}
          responsive={[
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {/* {relatedProduct?.slice(0, 10).map((data) => (
            <ProductOne product={data} key={data.id} />
          ))} */}
        </SlickSlider>
      </Section>
    </>
  );
};

export default ProductDetails;
