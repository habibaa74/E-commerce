import React, { useContext, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
let {checkout ,cartId}=useContext(CartContext)
    let validationSchema = Yup.object({
      details: Yup.string().required("details are required"),
      phone: Yup.string()
        .required("phone is required")
        .matches(/^01[0125][0-9]{8}$/, "phone is invalid"),
        city:Yup.string().required("City is required").matches(/^[A-Za-z00C0-017F]+(?:[ '-][A-Za-z00C0017F]+)*$/gm,"City is invalid")

    });
     let formik = useFormik({
        initialValues: {
          details: "",
          phone: "",
          city: "",
  
        },
        validationSchema,
        onSubmit:()=> handleCheckout(cartId,`http://localhost:5173`),
      });
      async function handleCheckout(cartId,url) {
 let {data}=  await checkout(cartId,url,formik.values)

 window.location.href = data.session.url
        }
  return (<div className='sm:mt-36 mt-4 px-4'>
   <div className='container mx-auto'>
  
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="details"
              className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
            >
              Details:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.details}
              onBlur={formik.handleBlur}
              name="details"
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.details && formik.errors.details ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            ) : null}
          </div>
          <div className="my-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
            >
              Phone:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              name="phone"
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="my-2">
            <label
              htmlFor="city"
              className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
            >
              City:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
              name="city"
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.city && formik.errors.city ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
              </div>
            ) : null}
          </div>
          <div className="my-4 text-end">
            {isLoading ? <button
              className="bg-main text-white px-4 py-2 rounded-lg"
              type="Submit"
            >
              <i className="fa fa-spinner fa-spin"></i>
            </button> :   <button
            disabled={!(formik.isValid && formik.dirty)}
              className="bg-main text-white px-10 py-2 rounded-lg"
              type="Submit"
            >
              Pay by Visa
            </button>}
          </div>
        </form>

   </div>
   <Helmet>
    <title>Check Out</title>
   </Helmet>
   </div>
  )
}

