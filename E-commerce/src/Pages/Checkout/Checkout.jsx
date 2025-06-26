import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
    console.log("cash");

    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    setCartInfo([]);
    setTimeout(() => {
      navigate("/allorders");
    }, 2000);
  }

  async function createOnlineOrder(values) {
    console.log("online");

    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5174`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    toast.loading("Redirect to payment gatway");
    setTimeout(() => {
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    }, 3000);
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType === "cash") {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="form-control w-full mb-3"
          placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          className="form-control w-full mb-3"
          placeholder="Phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
        />
        <textarea
          className="form-control w-full mb-3"
          placeholder="Details"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
        ></textarea>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="btn-primary rounded-md bg-blue-500 mx-4"
        >
          Cash order
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="btn-primary rounded-md"
        >
          Online order
        </button>
      </form>
    </>
  );
}
