import React, { useEffect, useState } from 'react'
import "../Brands/Brands.module.css"
import axios from 'axios'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Brands() {
  const [brandsData, setBrandData] = useState([])
  const [isloading, setisloading] = useState(true)
  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((data)=>{
      console.log(data.data.data);
      setBrandData(data.data.data)
      setisloading(false)
    }).catch((err)=>{
      console.log(err);
      isloading(false)
    })
  }
  useEffect(()=>{
    getBrands()
  },[])
  return (
    <div>
    <div className="container mx-auto px-4">
    {isloading ? <Loader/> : <div className="flex flex-wrap">
      {brandsData.map((brandData)=><Link to={`/BrandDetails/${brandData._id}`} key={brandData._id} className="sm:w-full md:w-1/4">
      <div  className="product px-2 py-2">
      <img src={brandData.image}  alt="" />
      <h3 className='text-main text-sm'>{brandData.name}</h3>
      </div>
        </Link>)}
      </div>}
    </div>
    <Helmet>
  <title>Brands</title>
</Helmet>
    </div>
  )
}
