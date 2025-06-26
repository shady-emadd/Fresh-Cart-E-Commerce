import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorieSlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return axios.request(options);
  }

  const { data, isFetching, isError, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <section className="py-4">
        <h2 className="text-xl font-bold pb-4">Shop popular categories</h2>
        <Swiper loop={true} slidesPerView={6}>
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`category/${category._id}`}>
                <img
                  src={category.image}
                  className="w-full h-60 object-cover"
                  alt=""
                />
                <h2 className="mt-1 font-bold text-center">{category.name}</h2>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
