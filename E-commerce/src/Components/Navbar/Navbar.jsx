import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { userContext } from "../../Context/User.context";
import { cartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const { token, LogOut } = useContext(userContext);
  const { cartInfo, getCartInfo } = useContext(cartContext);

  useEffect(() => {
    getCartInfo();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 p-4 w-full">
        <div className="container m-auto flex items-center justify-content-between gap-5">
          <ul>
            <li>
              <Link to={"/"}>
                <img src={logo} alt="" />
              </Link>
            </li>
          </ul>
          {token ? (
            <ul className="flex gap-5">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          <div className="ms-auto relative cursor-pointer flex justify-between">
            <Link to={`/cart`} className="ms-auto relative cursor-pointer">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <span className="bg-lime-500 rounded-full w-4 h-4 text-sm font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center ite">
                {cartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  cartInfo.numOfCartItems || 0
                )}
              </span>
            </Link>
            <Link to={`/wishlist`}>
              <i className="fa-regular fa-heart text-xl mx-4"></i>
            </Link>
          </div>
          <ul className="flex gap-5 mx-3">
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                        isActive ? "font-bold before:w-full" : " before:w-0"
                      }`;
                    }}
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                        isActive ? "font-bold before:w-full" : " before:w-0"
                      }`;
                    }}
                    to="/auth/signup"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  onClick={LogOut}
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:w-full hover:before:w-full before:bg-lime-600 before:absolute before:left-0 before:bottom-0 before:transition-[width] before:duration-300 hover:font-bold ${
                      isActive ? "font-bold before:w-full" : " before:w-0"
                    }`;
                  }}
                  to="/auth/login"
                >
                  SignOut
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
