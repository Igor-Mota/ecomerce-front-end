"use client";
import Link from "next/link";
import SectionTitle from "../elements/SectionTitle";
import CountDown from "../elements/CountDown";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { environment } from "@/data/environment";

const PosterOne = ({ data, isLoading, ...props }) => {
  if (isLoading || data.length < 1)
    return (
      <div className="container">
        <Skeleton width="100%" height={400} />
      </div>
    );

  const promotionalProduct = data.find((prod) => prod.end_promotion);
  console.log(promotionalProduct);

  return (
    <div className="axil-poster-countdown mt-3">
      <div className="container">
        <div className="poster-countdown-wrap bg-lighter">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="poster-countdown-content">
                <SectionTitle
                  title={
                    promotionalProduct.name ?? "Enhance Your Music Experience"
                  }
                  subtitle={props.subtitle ?? "Don’t Miss!!"}
                  subColor={props.subColor ?? "highlighter-secondary"}
                  subtitleIcon={props.subtitleIcon ?? "fal fa-headphones-alt"}
                />
                <div className="poster-countdown countdown mb--40">
                  <CountDown
                    unit
                    date={
                      promotionalProduct.end_promotion ?? "2023-12-01T23:59:59"
                    }
                  />
                </div>
                <Link href="/shop" className="axil-btn btn-bg-primary">
                  Check it Out!
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="poster-countdown-thumbnail">
                <Image
                  src={
                    `${environment.API_STORE}/${promotionalProduct.images[0].url}` ??
                    "/images/product/poster/poster-03.png"
                  }
                  alt="Poster Thumbnail"
                  width={props.thumbWidth ?? 452}
                  height={props.thumbHeight ?? 502}
                />
                {props.singleAnimation && (
                  <div className="music-singnal">
                    <div className="item-circle circle-1" />
                    <div className="item-circle circle-2" />
                    <div className="item-circle circle-3" />
                    <div className="item-circle circle-4" />
                    <div className="item-circle circle-5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterOne;
