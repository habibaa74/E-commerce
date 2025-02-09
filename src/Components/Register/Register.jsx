import React, { useState } from "react";
import "../Register/Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Register() {
  let navigate = useNavigate()
  const [usermessage, setUsermessage] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .matches(
        /^[A-Z][a-z]{2,9}$/,
        "Name Must be from 3 Chars to 10 Chars First char capital"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z0-9\W]{5,16}$/, "Password is invalid"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Not Match With Password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "That's Not Egyption Number"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });
  async function register(values) {
    setIsLoading(true)
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) =>{
 setUsermessage(data?.data?.message)
 setErrorEmail(null)
 setIsLoading(false)
 navigate("/login")
      })
      .catch((err) =>{
        setErrorEmail(err.response?.data.message)
        setUsermessage(null)
        setIsLoading(false)
      });
  }
  return (
    <div className='height px-4'>
      <div className="w-1/2 mx-auto">
        <h1 className="text-main text-3xl mb-5 font-bold">Register Now :</h1>
        {usermessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
        {usermessage}
        </div> : null
        }
        {errorEmail ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {errorEmail}
        </div> : null
        }
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              name="name"
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>
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
          <div className="my-2">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              repassword:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              name="rePassword"
              type="password"
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="my-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              phone:
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
              Register
            </button>}
          </div>
        </form>
      </div>
      <Helmet>
    <title>Register</title>
   </Helmet>
    </div>
  );
}
