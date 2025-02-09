import React, { useContext, useEffect, useState } from 'react'
import "../WishList/WishList.module.css"
import { WishListContext } from '../../Context/WishListContext'
import Loader from '../loader/loader'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'

export default function WishList() {
  const [isLoading, setisLoading] = useState(true)
  const [listItems, setListItems] = useState([])
  let {getWishList,removeWishlistItem}=useContext(WishListContext)
  let {addToCart} =useContext(CartContext)
  async function addProductToCart(productId){
    let response =await addToCart(productId);
  } 
  async function getAllWishList(){
    let response = await getWishList();
   setisLoading(false)
   setListItems(response.data.data)
  }
  async function removeItem(productId){
    let response = await removeWishlistItem(productId);
    setListItems(response.data.data)
    setisLoading(true)
  }
  useEffect(()=>{
    getAllWishList()
  },[])
  useEffect(()=>{
  getAllWishList()
  },[listItems])
  return (<div className='height px-4'>
    {isLoading ? <Loader/> : <div className='container mx-auto bg-slate-950 text-white p-4'>
      <h1 className='text-center text-main text-4xl font-bold'>Your WishList <i className={`fa-solid fa-heart text-3xl hover:cursor-pointer`}></i></h1>
      <div  className='flex flex-wrap'> 
     {listItems.map((item ,index)=>(
      <div key={item._id ||index} className='w-full flex flex-wrap justify-between items-center my-5 border-b p-3'>
        <div className="w-5/12 flex justify-between items-center">
        <img src={item?.imageCover} className='w-2/6' alt="" />
          <div className="w-3/6">
          <h4 className='text-main font-bold'>{item.title?.split(" ").slice(0,2).join(" ")}</h4>
          <h4 className='font-bold'>Price: {item.price}</h4>
          <h4 className='font-bold'>Sold: {item.sold}</h4>
          <h4 className='font-bold'>Rating: {item.ratingsAverage}<i className="fa fa-star rating-color ms-1"></i></h4>
          <button key={item.id} onClick={()=>removeItem(item._id)} className="bg-transparent border-2 border-red-900 btn rounded-lg text-white px-5 py-3 hover:bg-red-900 my-2">remove</button>
          </div>
        </div>
        <div className="w-3/12">
        <button key={item._id || index} onClick={()=>{addProductToCart(item._id)}} className="bg-transparent border-2 border-green-900 btn rounded-lg text-white px-8 py-4 hover:bg-green-900">Add To Cart</button>
        </div>
      </div>
     ))}
    </div>
    </div>}
    <Helmet>
    <title>WishList</title>
   </Helmet>
    </div>
  )
}
