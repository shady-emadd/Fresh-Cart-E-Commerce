import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";

export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;
  const { addProductToCart } = useContext(cartContext);

  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img src={images[0]} alt="photo" className="w-full" />
          <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-150 bg-black-layer  w-full h-full absolute top-0 left-0 flex items-center justify-center gap-2">
            <div className="icon hover:scale-110 hover:rotate-6 bg-lime-600 transition-transform duration-300 w-8 h-8 rounded-full bg-primary text-sm text-white flex justify-center items-center cursor-pointer">
              <i className="fa-solid fa-heart "></i>
            </div>
            <div
              onClick={() => {
                addProductToCart({ id });
              }}
              className="icon hover:scale-110 hover:rotate-6 bg-lime-600 transition-transform duration-300 w-8 h-8 rounded-full bg-primary text-sm text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon hover:scale-110 hover:rotate-18 bg-lime-600 transition-transform duration-300 w-8 h-8 rounded-full bg-primary text-sm text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-eye text-white"></i>
            </Link>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-primary text-sm">{category.name}</h3>
          <h1 className="text-lg font-bold line-clamp-2">{title}</h1>
          <div className="flex items-center justify-between mt-2">
            <p>{price} EGP</p>
            <div className="flex gap-1 items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <p>{ratingsAverage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
