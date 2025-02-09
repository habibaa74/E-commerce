import React, { useContext, useEffect, useState } from 'react'
import "../Cart/Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setisLoading] = useState(true)
  let {getCart,removeCartItem ,updateCart ,clearCart,totalPrice} = useContext(CartContext)
  async function getAllCart(){
    let response = await getCart();
   setisLoading(false)
    setCartItems(response.data.data.products)
  }
  async function updateproduct(productId,count){
    let response = await updateCart(productId , count);
   setCartItems(response.data.data.products)

  }
  async function removeItem(productId){
    let response = await removeCartItem(productId);
   setCartItems(response.data.data.products)

  }
  async function clearAllCart(){
    let response = await clearCart();
   setCartItems([])
  }
  useEffect(()=>{
    getAllCart()
  },[])
  return <div className='height px-4'>
 
{isLoading ? <Loader/> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
  <div className='text-end'>
    <button onClick={()=>{clearAllCart()}} className='bg-red-800 text-white px-3 py-2 rounded-xl my-5 me-10'><i className="fa-solid fa-trash-can"></i> Clear All Products</button>
  </div>
  <table className="w-full container mx-auto text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
         Unit Price
        </th>
        <th scope="col" className="px-6 py-3">
         Total Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {cartItems.map((item)=><tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title.split(" ").slice(0,2).join(" ")}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{updateproduct(item.product.id , item.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{item.count}</span>
            </div>
            <button onClick={()=>{updateproduct(item.product.id , item.count +1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price} EGP
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price * item.count} EGP
        </td>
        <td className="px-6 py-4">
          <a onClick={()=>{removeItem(item.product.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
    )}
 {totalPrice >= 0 &&  <tr className="bg-white border-b text-center font-extrabold text-black text-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td>Total Price</td>
      <td colSpan="4">{totalPrice} EGP</td>
      <td>  <div className='text-start'>
<Link to={`/Checkout`}>
<button  className='bg-green-800 text-white px-3 py-2 rounded-xl my-5 me-10'>Pay</button>
</Link>
  </div></td>
    </tr>}
    </tbody>

  </table>

</div>}
<Helmet>
  <title>Cart</title>
</Helmet>
    </div> 
}
