import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CatDetails from "./Components/CatDetails/CatDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import VerifyCode from "./Components/ForgetPassword/ForgetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import SetPassword from "./Components/SetPassword/SetPassword"
import "../node_modules/flowbite/dist/flowbite"
function App() {
  const queryClient = new QueryClient();
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "Products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },

        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "Login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "Register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "CategoryDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <CatDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "BrandDetails/:id",
          element: (
            <ProtectedRoute>
              <BrandDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "Checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "WishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path:"ForgetPassword",
          element: (
            <ProtectedAuth>
              <ForgetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path:"ResetCode",
          element: (
            <ProtectedAuth>
              <ResetCode/>
            </ProtectedAuth>
          ),
        },
        {
          path:"SetNewPassword",
          element: (
            <ProtectedAuth>
              <SetPassword/>
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-left" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
