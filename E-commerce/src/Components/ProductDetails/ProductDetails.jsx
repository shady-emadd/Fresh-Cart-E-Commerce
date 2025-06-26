import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../Context/Cart.context";
import useOnlineStatus from "../../Hooks/useOnlineStatus";

export default function ProductDetails() {
  let isOnline = useOnlineStatus();

  const [details, setDtails] = useState(null);
  const { addProductToCart } = useContext(cartContext);
  let { id } = useParams();

  async function getProductDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDtails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const imagesItems = details?.images.map((imageURL) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });

  return (
    <>
      {details == null ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-12">
          <div className="col-span-4">
            <ReactImageGallery
              items={imagesItems}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="col-span-8">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <h3 className="text-primary font-semibold">
              {details.category.name}
            </h3>
            <p className="mt-3">{details.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span>{details.price} EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                {details.ratingsAverage}
              </span>
            </div>
            <button
              className="btn-primary w-full mt-4"
              onClick={() => {
                addProductToCart({ id: details.id });
              }}
            >
              {isOnline ? "Add to cart" : "Check your internet connection"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
