"use client";
import { useState } from "react";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";
import { useGetManyProducts } from "@/services/http/many.products";

const Shop = ({ searchParams }) => {
  const [offset, setOffset] = useState(3);
  const { data, isLoading, isRefetching } = useGetManyProducts(offset);

  if (!!isLoading) return <p>Carregando...</p>;

  return (
    <>
      <HeaderFive headerCampaign />
      <Breadcrumb activeItem="Shop" title="Explore All Products" />
      <main className="main-wrapper">
        {searchParams.layout === "no-sidebar" ? (
          <ShopNoSidebar
            isLoad={isLoading}
            products={data}
            setOffSet={setOffset}
          />
        ) : (
          <ShopWithSidebar
            isLoad={isLoading}
            products={data}
            setOffSet={setOffset}
            refetch={isRefetching}
          />
        )}
        <NewsLetter />
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default Shop;
