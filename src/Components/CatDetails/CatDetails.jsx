import { useParams } from "react-router-dom";
import "../CatDetails/CatDetails.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import { Helmet } from "react-helmet";
export default function CatDetails() {
  const [subCategories, setsubCategories] = useState([])
  const [isloading, setisloading] = useState([])
let {id ,category}=useParams()
async function getSub(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`).then((data)=>{
    console.log(data.data.data);
    setsubCategories(data.data.data)
    setisloading(false)
  }).catch((err)=>{
    console.log(err);
    setisloading(false)
  })
}

useEffect(()=>{

  getSub()
},[])
  return (
    <div className='height px-4'>
    <div className="container mx-auto text-center mt-32 md:mt-4 ">
        <h1 className="text-main text-4xl font-extrabold">{category} SubCategories</h1>
       {isloading ? <Loader/> : <div className="flex flex-wrap my-10">
      {subCategories.map((product)=><div key={product._id} className="sm:w-full md:w-1/3">
      <div  className="product px-10 m-5 py-5 border bottom-2">
      <h3 className='text-black font-bold text-2xl'>{product?.name}</h3>
      </div>
        </div>)}
      </div>}
    </div>
    <Helmet>
  <title>Category Details</title>
</Helmet>
    </div>
    
  );
}
