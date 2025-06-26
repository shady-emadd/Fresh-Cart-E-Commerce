import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const wishListContext = createContext(null);

export default function WishListProvider() {
  async function wishListInfo() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      return await axios.request(options);
    } catch (error) {
      console.log(error);
    }
  }

  let response = useQuery({
    queryKey: ["wishlist"],
    queryFn: wishListInfo,
  });

  return <wishListContext.Provider></wishListContext.Provider>;
}
