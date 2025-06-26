import { useState } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/Allorders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./Pages/Products/Products";
import WishList from "./Pages/WishList/WishList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/category/:id", element: <h2>Category</h2> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products", element: <Products /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
            <Toaster />
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
