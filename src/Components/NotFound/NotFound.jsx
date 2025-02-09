import React from 'react'
import "../NotFound/NotFound.module.css"
import error from "../../assets/404.jpg"
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (<div className='height'>
    <div className='container justify-center items-center flex'>
      <img src={error} alt="" />
    </div>
    <Helmet>
    <title>Not Found</title>
   </Helmet>
    </div>
  )
}
