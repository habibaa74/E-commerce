import React, { useContext, useEffect, useState } from "react";
import "../FeaturedProducts/FeaturedProducts.module.css";
import axios from "axios";

import Loader from "../loader/loader";
import { useQuery } from "@tanstack/react-query";
import img from "./../../assets/network.jpg"
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
export default function FeaturedProducts() {
  let {addToWishList,wishListItems} =useContext(WishListContext)    
    async function addProductToWishList(productId){
      let response =await addToWishList(productId);
    }
let {addToCart} = useContext(CartContext);

async function addProductToCart(productId){
  let response =await addToCart(productId);  
}
function getFeaturedProduct(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
 let{data,isError ,isLoading}=useQuery({
    queryKey:["featureProduct"],
    queryFn:getFeaturedProduct
  })

  return (
    <>
      <div className="container mx-auto px-4">
      {isError ? <div className="flex justify-center"><img src={img} className="h-[500px]" alt="" /></div>: null}
        {isLoading ? <Loader/> :<div className="flex flex-wrap">
          {data?.data?.data.map((product) => (
            <div key={product._id} className="sm:w-full sm:mx-auto md:w-1/4 lg:w-1/6 mx-auto">
              <div className="product py-3 px-2 overflow-hidden">
               <Link to={`/productDetails/${product.id}/${product.category?.name}`}>
               <img
                  src={product.imageCover}
                  className="w-[200px] h-[250px]"
                  alt=""
                />
                <h3 className="text-main text-sm">{product.category.name}</h3>
                <p>{product.title.split(" ").slice(0,2).join(" ")}</p>
                <div className="flex justify-between">
                  <p>{product.price}EGP</p>
                  <div>
                    <i className="fa fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
               </Link>
                <div className="flex flex-wrap items-center justify-between">
                <button onClick={()=>{addProductToCart(product._id)}} className="bg-main btn w-5/6 rounded-lg text-white px-3 py-2">Add To Cart</button>
                <div  onClick={()=>{addProductToWishList(product._id)}} className="w-1/6" style={{color:wishListItems?.includes(product._id)? "red":"black"}}>
           <i className={`fa-solid fa-heart text-3xl hover:cursor-pointer`}></i> 
              </div>
              </div>
              </div>
       
            </div>
          ))}
        </div>}

      </div>
    </>
  );
}
