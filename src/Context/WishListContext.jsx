import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();
export default function WishListContextprovider(props) {
  const [numOfProduct, setNumOfProduct] = useState(0)
  const [wishListItems, setWishListItems] = useState([])
  let headers = {
    token: localStorage.getItem("UserToken"),
  };
  async function addToWishList(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((response) => {
        toast.success(response.data.message);
        setWishListItems(response.data.data)
        localStorage.setItem("WishList",response.data.data)
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  async function getWishList() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => {   
        setNumOfProduct(response.data.count)
          return response;
      })
      .catch((err) => {
        return err;
      });
  }
  async function removeWishlistItem(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        toast.success("Item Removed Successfully From Your WishList");
        setWishListItems(response.data.data)
        localStorage.setItem("WishList",response.data.data)
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
useEffect(()=>{
  setWishListItems(localStorage.getItem("WishList"))
  getWishList()
},[])
  return (
    <WishListContext.Provider
      value={{ addToWishList, getWishList, removeWishlistItem ,numOfProduct,wishListItems}}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
