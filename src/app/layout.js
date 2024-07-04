"use client";
import { useEffect } from "react";
import { Providers } from "@/store/provider";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/services/http/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import "react-loading-skeleton/dist/skeleton.css";

const RootLayout = ({ children }) => {
  useEffect(() => {
    window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/font-awesome.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;