import React, { useContext, useEffect } from "react";
import "../Navbar/Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { Flowbite } from "flowbite-react";
export default function Navbar() {
  let { numOfCart, getCart } = useContext(CartContext);
  let { token, setToken } = useContext(TokenContext);
  let {numOfProduct} = useContext(WishListContext)
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("UserToken");
    setToken(null);
    navigate("/Login");
  }
  async function getAllCart() {
    let response = await getCart();
  }
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      getAllCart();
    }
  }, []);
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-x-4 items-center">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <ul className="flex items-center">
                  <li>
                    <div className="relative">
                      <Link to="/Cart">
                        <i className="fa-solid fa-cart-shopping font-bold text-2xl text-slate-900 hover:text-green-700"></i>
                      </Link>
                      {numOfCart > 0 && (
                        <span className="absolute -top-3 -right-3 bg-main text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {numOfCart}
                        </span>
                      )}
                    </div>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logOut();
                      }}
                      href="#"
                      className="block py-2 px-3 text-[#0aad0a] rounded font-bold hover:text-red-600"
                    >
                      LogOut
                    </a>
                  </li>
                </ul>
              ) : (
                <>
                  <li>
                    <Link
                      to="Login"
                      className="block py-2 text-gray-900 rounded font-bold hover:text-[#0aad0a]"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="Register"
                      className="block py-2 text-gray-900 rounded font-bold hover:text-[#0aad0a]"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {token ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to=""
                    className="block py-2 px-3  text-gray-900 font-bold rounded hover:text-[#0aad0a]"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Cart"
                    className="relative block py-2 px-3 text-gray-900 font-bold rounded hover:text-[#0aad0a]"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="WishList"
                    className="relative block py-2 px-3 text-gray-900 font-bold rounded hover:text-[#0aad0a]"
                  >
                    WishList
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Categories"
                    className="block py-2 px-3 text-gray-900 rounded font-bold hover:text-[#0aad0a] "
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Products"
                    className="block py-2 px-3 text-gray-900 rounded font-bold hover:text-[#0aad0a]"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Brands"
                    className="block py-2 px-3 text-gray-900 rounded font-bold hover:text-[#0aad0a]"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
