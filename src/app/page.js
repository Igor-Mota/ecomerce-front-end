"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SlickSlider from "@/components/elements/SlickSlider";
import BannerOne from "@/components/hero-banner/BannerOne";
import PosterOne from "@/components/poster/PosterOne";
import ProductOne from "@/components/product/ProductOne";
import TestimonialOne from "@/components/testimonial/TestimonialOne";
import ProductsData from "@/data/Products";
import FooterTwo from "@/components/footer/FooterTwo";
import ServiceTwo from "@/components/services/ServiceTwo";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ProductListOne from "@/components/product/ProductListOne";
import { mapInSlices, slugify } from "@/utils";
import ProductTwo from "@/components/product/ProductTwo";
import {
  useGetHomeProducts,
  useGetHomePromotion,
  useGetArrivals,
  useGetMostSold,
} from "@/services/http/home.service";
import Skeleton from "react-loading-skeleton";
import HeaderFive from "@/components/header/HeaderFive";
import { productsFetcher } from "@/services/http/many.products";

const HomeElectronics = ({ products }) => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const pageCategory = split[split.length - 1];
  const electronicsProduct = ProductsData.filter(
    (data) => slugify(data.pCate) === pageCategory,
  );
  const exploreProduct = mapInSlices(electronicsProduct, 8);
  const { data } = useGetHomeProducts();
  const { data: promotion, isLoading: promotionIsLoad } = useGetHomePromotion();
  const { data: arrivals, isLoading: arrivalsIsLoading } = useGetArrivals();
  const { data: mostSold, isLoading: mostSoldIsLoading } = useGetMostSold();
  const idx = promotion.data.findIndex(
    (product) => typeof product.CountTime === "string",
  );

  return (
    <>
      <HeaderFive />
      <main className="main-wrapper">
        {data.data.length > 0 && <BannerOne data={data} />}
        {idx !== -1 && (
          <PosterOne
            isLoading={promotionIsLoad}
            singleAnimation
            {...promotion.data[idx]}
          />
        )}

        <Section pClass="pb--0" borderBottom="pb--50">
          <SectionTitle
            title="New Arrivals"
            subtitle="This Week’s"
            subtitleIcon="far fa-shopping-basket"
            subColor="highlighter-primary"
          />

          <SlickSlider
            class="slick-layout-wrapper--30 axil-slick-arrow arrow-top-slide"
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
            {arrivalsIsLoading && (
              <>
                <Skeleton circle width="100%" height={200} />
                <Skeleton circle width="100%" height={200} />
                <Skeleton circle width="100%" height={200} />
              </>
            )}
            {!arrivalsIsLoading &&
              arrivals.data.map((product) => {
                return <ProductTwo key={product.id} product={product} />;
              })}
          </SlickSlider>
        </Section>

        <Section pClass="axil-most-sold-product" borderBottom="pb--50">
          <SectionTitle
            title="Most Sold in eTrade Store"
            subtitle="Most Sold"
            subtitleIcon="fas fa-star"
            subColor="highlighter-primary"
            pClass="section-title-center"
          />
          <div className="row row-cols-xl-2 row-cols-1 row--15">
            {mostSoldIsLoading && (
              <>
                <Skeleton circle width="100%" height={180} />
                <Skeleton circle width="100%" height={180} />
              </>
            )}
            {mostSold.data.map((product) => (
              <div className="col" key={product.id}>
                <ProductTwo product={product} />;
              </div>
            ))}
          </div>
        </Section>
        <NewsLetter />
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default HomeElectronics;
