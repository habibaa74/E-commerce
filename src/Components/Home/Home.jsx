import React from 'react'
import "../Home/Home.module.css"
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <div>
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProducts/>
      <Helmet>
    <title>Home</title>
   </Helmet>
    </div>
  )
}
