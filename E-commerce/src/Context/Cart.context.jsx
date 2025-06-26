import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(userContext);

  async function getCartInfo() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.numOfCartItems == 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      }
    }
  }

  async function addProductToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      const { data } = await axios.request(options);
      setCartInfo(data);
      toast.success("Product added successfully to your cart");
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      if (data.numOfCartItems == 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
      toast.success("Product removed successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductInCart({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };

      const { data } = await axios.request(options);
      if (data.numOfCartItems == 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
      // toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo([]);
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getCartInfo,
        cartInfo,
        setCartInfo,
        removeProductFromCart,
        updateProductInCart,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
