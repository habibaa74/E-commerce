import React, { useContext, useEffect, useState } from "react";
import "../ProductDetails/ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  let {addToWishList,wishListItems} =useContext(WishListContext)

  async function addProductToWishList(productId){
    let response =await addToWishList(productId);
    console.log(response);
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
  };
  let {addToCart} = useContext(CartContext);
  
  async function addProductToCart(productId){
    let response =await addToCart(productId);
    console.log(response);
    
  }
  let { id , category} = useParams();

  async function getProductsDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProductDetails(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message);
      });
  }
  useEffect(() => {
    getProductsDetails();

  }, []);
  useEffect(()=>{
    getProductsDetails()

  },[id])
  return (
    <div>
      <div className="container mx-auto px-4">
        {isLoading? <Loader/>: null}
        <div className="flex justify-center items-center gap-3">
          <div className="w-1/4 ">
          <Slider {...settings}>
{ProductDetails?.images?.map((src)=><img src={src} key={ProductDetails?.id} alt="" />
)}
    </Slider>
          </div>
          <div className="w-3/4">
            <h1 className="text-black font-bold text-2xl my-5">
              {ProductDetails.title}
            </h1>
            <h3 className="text-gray-700 text-sm my-5">{ProductDetails.description}</h3>
            <p className="font-bold">{ProductDetails.category?.name}</p>
            <div className="flex justify-between my-5">
              <p className="font-semibold">{ProductDetails.price} EGP</p>
              <div className="font-semibold">
                <i className="fa fa-star rating-color"></i>
                {ProductDetails.ratingsAverage}
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <button onClick={()=>{addProductToCart(ProductDetails._id)}} className="bg-main btn w-11/12 rounded-lg text-white px-3 py-2 my-5">
                Add To Cart
              </button>
             <div  onClick={()=>{addProductToWishList(ProductDetails._id)}} style={{color:wishListItems?.includes(ProductDetails._id)? "red" : "black"}} >
        <i className={`fa-solid fa-heart text-3xl hover:cursor-pointer`}></i> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
    <title>Product Details</title>
   </Helmet>
    </div>
  );
}

