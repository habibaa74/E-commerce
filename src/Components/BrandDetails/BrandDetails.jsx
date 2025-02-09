import React, { useEffect, useState } from 'react'
import "../BrandDetails/BrandDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../loader/loader'
import { Helmet } from 'react-helmet'
export default function BrandDetails() {
  let{id}=useParams()
  const [brandDetails, setBrandDetails] = useState([])
  const [isLoading, setisLoading] = useState(true)
  async function getDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((data)=>{
      console.log(data.data.data);
      setBrandDetails(data.data.data)
      setisLoading(false)
    }).catch((err)=>{
      console.log(err);
      setisLoading(false)
    })
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (<div className='height px-4'>
    {isLoading ? <Loader/>:
     <div className="container mx-auto mt-40 ">
    <div className="flex justify-between items-center bg-slate-900 p-14 rounded-xl">
      <div className="w-1/4">
    <img src={brandDetails.image} alt="" />  
    </div>
      <div className="w-2/4 ms-10 text-5xl font-bold text-white uppercase">
      {brandDetails.name}
      </div>
    </div>
   </div>
  }
  <Helmet>
  <title>Brand Details</title>
</Helmet>
  </div>
  )
}
