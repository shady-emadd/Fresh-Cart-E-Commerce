import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/Card/ProductCard";
import { useState } from "react";
import useProducts from "../../Hooks/useProducts";

export default function Products() {
  // async function getProducts() {
  //   const options = {
  //     url: "https://ecommerce.routemisr.com/api/v1/products",
  //     method: "GET",
  //   };

  //   return axios.request(options);
  // }

  // let { data, isLoading } = useQuery({
  //   queryKey: ["Products"],
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
      <div className="grid grid-cols-12 gap-5">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
