import React, { useContext, useState } from 'react'
import "../Login/Login.module.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';
export default function Login() {
  let navigate = useNavigate()
  const [usermessage, setUsermessage] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
let {token ,setToken}=useContext(TokenContext)
    let validationSchema = Yup.object({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .matches(/^[A-Za-z0-9\W]{5,16}$/, "Password is invalid"),

    });
     let formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema,
        onSubmit: (values) => {
          login(values);
        },
      });
      async function login(values) {
        setIsLoading(true)
        return await axios
          .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
          .then((data) =>{
     setUsermessage(data.data.message)
     localStorage.setItem("UserToken",data.data.token)
     setToken(data.data.token)
     setErrorEmail(null)
     setIsLoading(false)
     navigate("/")
          })
          .catch((err) =>{
            setErrorEmail(err.response.data.message)
            setUsermessage(null)
            setIsLoading(false)
          });
        }
  return (
   <div className='h-[310px] px-4'>
        <div className="w-1/2 mx-auto">
        <h1 className="text-main text-3xl mb-5 font-bold">Login Now :</h1>
        {usermessage ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
        {usermessage}
        </div> : null
        }
        {errorEmail ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {errorEmail}
        </div> : null
        }
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email:
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
          <div className="my-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <Link to="/ForgetPassword" className='font-semibold hover:text-red-900 hover:underline'>Forget Your Password ?</Link>
          <div className="my-4 text-end">
            {isLoading ? <button
              className="bg-main text-white px-4 py-2 rounded-lg"
              type="Submit"
            >
              <i className="fa fa-spinner fa-spin"></i>
            </button> :   <button
            disabled={!(formik.isValid && formik.dirty)}
              className="bg-main text-white px-4 py-2 rounded-lg"
              type="Submit"
            >
              Login
            </button>}
          </div>
        </form>
      </div>
      <Helmet>
    <title>Login</title>
   </Helmet>
   </div>
  )
}
