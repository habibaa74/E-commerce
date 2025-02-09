import React, { useContext, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { data, Link, useNavigate} from "react-router-dom";
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
    let validationSchema = Yup.object({
      email: Yup.string().required("Email is required").email("Email is invalid"),
    });
     let formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema,
        onSubmit: (values) => {
          ForgetPassword(values);
        },
      });
      async function ForgetPassword(values) {
        setIsLoading(true)
        return await axios
          .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
          .then((data) =>{
            toast.success(data.data.message)
     setIsLoading(false)
    console.log(data);
    navigate("/ResetCode")
          })
          .catch((err) =>{
console.log(err);

            setIsLoading(false)
          });
        }
  return (<div className='h-[310px] px-4'>
   <div className='container mx-auto'>
    <h1 className='text-main font-bold text-3xl my-6'>Enter Your Email For Reset Code</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
             Enter Your Email:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>
    
     
          <div className="my-4 text-start">
            {isLoading ? <button
              className="bg-main text-white px-4 py-2 rounded-lg"
              type="Submit"
            >
              <i className="fa fa-spinner fa-spin"></i>
            </button> :   <button
            disabled={!(formik.isValid && formik.dirty)}
              className="bg-main text-white px-7 py-4 rounded-lg"
              type="Submit"
            >
              Verify Email
            </button>}
          </div>
        </form>
      <Helmet>
    <title>Forget Password</title>
   </Helmet>
   </div></div>
  )
}
