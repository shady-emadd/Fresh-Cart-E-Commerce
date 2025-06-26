import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  console.log(id);

  async function getUsersOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    getUsersOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>All orders</title>
        <meta name="description" welcome to the orders page />
      </Helmet>

      {!orders ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div className="order border border-gray-400 p-5">
            <div className="flex justify-between items-center">
              <div className="mx-12">
                <h2 className="text-gray-400">Order ID</h2>
                <h3 className="font-bold">#{order.id}</h3>
              </div>
              <div className="">
                {order.isDeliverd ? (
                  <span className="btn-primary bg-blue-500 rounded-md text-xs mx-3">
                    Delivered
                  </span>
                ) : (
                  <span className="btn-primary bg-blue-500 rounded-md text-xs mx-3">
                    On delivery
                  </span>
                )}
                {order.isPaid ? (
                  <span className="btn-primary bg-green-600 rounded-md text-xs">
                    Paid
                  </span>
                ) : (
                  <span className="btn-primary bg-red-600 rounded-md text-xs">
                    Unpaid
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-4 grid-cols-12 mt-3">
              {order.cartItems.map((product) => (
                <div className="product col-span-2 rounded border border-gray-300 cursor-pointer text-center p-2">
                  <img
                    src={product.product.imageCover}
                    className="w-full object-cover"
                    alt=""
                  />
                  <h3 className="font-semibold line-clamp-3">
                    {product.product.title}
                  </h3>
                  <span>{product.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
