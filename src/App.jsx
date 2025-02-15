import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextprovider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import Products from "./components/Products/Products";
import Type from "./components/Type/Type";
import WishListed from "./components/Wishlisted/Wishlisted";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Wishlistprovider from "./Context/Wishlist";
let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishListed />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "Type/:categoies",
        element: (
          <ProtectedRoute>
            <Type />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={70}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 1000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <UserContextprovider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
           <Wishlistprovider>
              <RouterProvider router={x} />
              </Wishlistprovider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextprovider>
    </>
  );
}
