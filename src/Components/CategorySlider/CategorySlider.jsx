import React from 'react'
import "../CategorySlider/CategorySlider.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick'
export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll:5,
    arrows:false,
    autoplay:true,
    autoplayspeed:500,
  };
  function getcategory(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data}= useQuery({
    queryKey:["categorySlider"],
    queryFn:getcategory
  })
  return (
<div className="container mx-auto my-10">
  <h1 className='my-5 font-semibold text-2xl'>Show Popular Categories:</h1>
<Slider {...settings}>
{data?.data.data.map((category)=><div key={category._id} className='text-center'>
<img src={category?.image} className='h-[200px] w-[250px]' alt="" />
<p>{category?.name}</p>
</div>
)}
    </Slider>
</div>      
  )

}
