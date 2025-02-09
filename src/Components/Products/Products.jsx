import React from 'react'
import "../Products/Products.module.css"
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return (
    <>
    <FeaturedProducts/>
    <Helmet>
    <title>Products</title>
   </Helmet>
    </>
  )
}
