import React, { useEffect, useState } from 'react'
import "../Categories/Categories.module.css"
import axios from 'axios'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Categories() {
  const [categoriesData, setCategoriesData] = useState([])
  const [isloading, setisloading] = useState(true)
  async function getCategory(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
      setCategoriesData(data.data.data)  
      setisloading(false)
    }).catch((err)=>{
      console.log(err);
      setisloading(false)
    })
  }
  useEffect(()=>{
    getCategory()
  },[])
  return<div className='height px-4'>
    <div className="container mx-auto">
   {isloading ? <Loader/> :
      <div className="flex flex-wrap">
      {categoriesData.map((categoryData)=><Link to={`/CategoryDetails/${categoryData?._id}/${categoryData.name}`} key={categoryData._id} className="sm:w-full sm:mx-auto md:w-1/5">   
      <div className="product px-2 py-2">
      <img src={categoryData.image} className='w-full h-[250px] mx-auto' alt="" />
      <h3 className='text-main text-sm'>{categoryData.name}</h3>
      </div>
        </Link>)}
      </div>}
    </div>
    <Helmet>
  <title>Categories</title>
</Helmet>
    </div>

}
