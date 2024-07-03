"use client";
import Skeleton from "react-loading-skeleton";

export const ProductSkeleton = () => {
  return (
    <>
      <div className="col-xl-3 col-lg-4 col-sm-6 mb-90">
        <Skeleton count={1} height={200} width={430} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <Skeleton count={1} height={200} width={330} />
      </div>
    </>
  );
};
