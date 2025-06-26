import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorieSlider from "../../Components/CategorieSlider/CategorieSlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useProducts from "../../Hooks/useProducts";

export default function Home() {
  // async function getProducts() {
  //   const options = {
  //     url: "https://ecommerce.routemisr.com/api/v1/products",
  //     method: "GET",
  //   };

  //   return axios.request(options);
  // }

  // let { data, isLoading, isFetching, isError } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  //   refetchOnMount: true,
  //   staleTime: 5000,
  //   refetchOnWindowFocus: false,
  //   refetchInterval: 60000,
  //   refetchIntervalInBackground: false,
  //   gcTime: 10000,
  //   retry: 2,
  //   retryDelay: 2000,
  // });

  let { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" welcome to the home page />
      </Helmet>

      <HomeSlider />

      <CategorieSlider />

      <div className="grid grid-cols-12 gap-5">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
