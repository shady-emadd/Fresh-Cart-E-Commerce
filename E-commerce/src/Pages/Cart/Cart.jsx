import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import Loading from "../../Components/Loading/Loading";

export default function Cart() {
  const { cartInfo, removeProductFromCart, updateProductInCart, clearCart } =
    useContext(cartContext);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-200 p-5">
          <h2 className="text-2xl font-bold mb-2">
            <span>Shop Cart</span>
            <i className="fa-solid fa-cart-shopping text-xl ml-2"></i>
          </h2>

          {cartInfo.length == 0 ? (
            <div className="py-16 flex flex-col gap-2 justify-center items-center">
              <h3 className="text-xl font-bold"> There are no items yet.</h3>
              <Link to={"/"} className="font-semibold btn-primary rounded-md">
                <span className="text-white">
                  ADD YOUR FIRST PRODUCT TO CART
                </span>
              </Link>
            </div>
          ) : (
            <>
              {cartInfo.data.products.map((product) => (
                <div
                  key={product._id}
                  className="product grid grid-cols-12 gap-5 py-1 mt-3"
                >
                  <div className="col-span-1">
                    <img
                      src={product.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="col-span-11 flex justify-between items-center">
                    <div className="">
                      <h3 className="text-lg font-semibold">
                        {product.product.title}
                      </h3>
                      <h3 className="text-primary">
                        Price : {product.price} EGP
                      </h3>
                      <button
                        onClick={() => {
                          removeProductFromCart({ id: product.product.id });
                        }}
                        className="bg-red-600 btn-primary rounded-md text-xs mt-2"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i> remove
                      </button>
                    </div>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => {
                          updateProductInCart({
                            id: product.product.id,
                            count: product.count - 1,
                          });
                        }}
                        className=" btn-primary rounded-md"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() => {
                          updateProductInCart({
                            id: product.product.id,
                            count: product.count + 1,
                          });
                        }}
                        className=" btn-primary rounded-md"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  clearCart();
                }}
                className="btn-primary bg-red-600 block ms-auto mt-4"
              >
                Clear cart
              </button>
            </>
          )}
        </section>
      )}

      <Link
        to="/checkout"
        className="btn-primary uppercase rounded-md font-semibold ms-auto block mt-4 w-fit"
      >
        <span className="text-white">next step</span>
      </Link>
    </>
  );
}
