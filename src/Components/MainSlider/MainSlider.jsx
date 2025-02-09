import React from 'react'
import "../MainSlider/MainSlider.module.css"
import img1 from "../../assets/images/grocery-banner-2.jpeg"
import img2 from "../../assets/images/grocery-banner.png"
import img3 from "../../assets/images/slider-2.jpeg"
import img4 from "../../assets/images/slider-image-1.jpeg"
import img5 from "../../assets/images/slider-image-2.jpeg"
import img6 from "../../assets/images/slider-image-3.jpeg"
import Slider from 'react-slick'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:false,
    autoplay:true,
    autoplayspeed:500,
  };
  return (
    <div className='container mx-auto'>
    <div className="flex">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={img3} className='h-[300px]' alt="" />
      <img src={img4} className='h-[300px]'  alt="" />
      <img src={img5} className='h-[300px]'  alt="" />
      <img src={img6} className='h-[300px]'  alt="" />
    </Slider>
      </div>
      <div className="w-1/4">
      <img src={img2} className='h-[150px]' alt="" />
      <img src={img1} className='h-[150px]' alt="" />
      </div>
    </div>
    </div>
  )
}
