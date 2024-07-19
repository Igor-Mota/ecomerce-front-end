"use client";

import { useEffect, useContext } from "react";
import { useAuthContext } from "@/providers/auth.provider";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import { DashboardAsideMenu } from "@/data/Menu";
import { UserLists } from "@/data/Users";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const DahsboardLayout = ({ children }) => {
  const { authProviderLoading } = useAuthContext();
  const userInfo = UserLists[0];
  const pathname = usePathname();
  const split = pathname.split("/");
  const pageSlug = split[split.length - 1];

  const {
    login,
    userData: { user },
  } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!login && !authProviderLoading) redirect("/");
  }, [login, authProviderLoading]);

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Breadcrumb activeItem="My Account" title="Explore All Products" />
        <div className="axil-dashboard-area axil-section-gap">
          <div className="container">
            <div className="axil-dashboard-warp">
              <div className="axil-dashboard-author">
                <div className="media">
                  <div className="thumbnail">
                    <Image
                      src={userInfo.avatar}
                      height={70}
                      width={70}
                      alt={userInfo.name}
                    />
                  </div>
                  <div className="media-body">
                    <h5 className="title mb-0">
                      Hello {user && user.userName ? user.userName : ""}
                    </h5>
                    <span className="joining-date">
                      eTrade Member Since{" "}
                      {user && user.joinDate
                        ? user.joinDate.split("-").reverse().join("/")
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-4">
                  <aside className="axil-dashboard-aside">
                    <nav className="axil-dashboard-nav">
                      <div className="nav nav-tabs">
                        {DashboardAsideMenu.map((data, index) => (
                          <Link
                            href={`dashboard/${data.slug}`}
                            className={`nav-item nav-link ${data.slug === pageSlug ? "active" : ""}`}
                            key={index}
                          >
                            <i className={data.icon} />
                            {data.name}
                          </Link>
                        ))}
                        <Link href="/sign-in" className="nav-item nav-link">
                          <i className="fal fa-sign-out" />
                          Logout
                        </Link>
                      </div>
                    </nav>
                  </aside>
                </div>
                <div className="col-xl-9 col-md-8">
                  <div className="tab-content">
                    {authProviderLoading && (
                      <Skeleton width="100%" height={200} />
                    )}
                    {!authProviderLoading && children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NewsLetter />
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default DahsboardLayout;
