import img1 from "../../assets/images/Footer/amazonpay.svg"
import img2 from "../../assets/images/Footer/american-express.svg"
import img3 from "../../assets/images/Footer/appstore-btn.svg"
import img4 from "../../assets/images/Footer/googleplay-btn.svg"
import img5 from "../../assets/images/Footer/mastercard.svg"
import img6 from "../../assets/images/Footer/paypal.svg"
import img7 from "../../assets/images/Footer/visa.svg"
import React from 'react'
import "../Footer/Footer.module.css"
export default function Footer() {
  return (
    <div className='bg-slate-800 p-8 block mt-auto bottom-0 left-0 right-0 text-white text-center'>
      <h2 className='text-2xl font-semibold text-start'>Get The FreshCart App</h2>
      <h4 className='text-start text-sm text-gray-400 my-3'>We Will Send You a Link , Open it on Your Phone to download The app.</h4>
      <div className="sm:flex justify-center items-center gap-6">
        <div className="md:w-9/12">
            <input
        placeholder='Enter Your Email...'
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
        </div>
        <button
              className="bg-main text-white px-4 py-2 rounded-lg  md:w-2/12"
              type="Submit"
            >
              Share App Link
            </button>
      </div>
      <div className="sm:flex items-center justify-between my-4 border-t border-b p-6">
    <div className="sm:flex items-center"><span className="font-semibold">Payment Partners</span>
        <div className="sm:flex items-center ms-10">
        <img src={img1} className="sm:ms-8 md:ms-0" alt="" />
        <img src={img2} className="ms-8 " alt="" />
        <img src={img5} className="ms-8" alt="" />
        <img src={img6} className="ms-8" alt="" />
        <img src={img7} className="ms-8" alt="" />
        </div></div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Get deliveries With FreshCart</span>
          <div className="flex items-center">
            <img src={img3} className="w-[120px]" alt="" />
            <img src={img4} className="w-[120px] ms-5" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
