import React, { useContext, useState } from "react";
import "../Register/Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TokenContext } from "../../Context/TokenContext";
export default function setpassword() {

  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z0-9\W]{5,16}$/, "Password is invalid"),

  });
  let formik = useFormik({
    initialValues: {
      email:"",
      passwordnewPassword: "",

    },
    validationSchema,
    onSubmit: (values) => {
      setpassword(values);
    },
  });
  async function setpassword(values) {
    setIsLoading(true)
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
      .then((data) =>{
console.log(data);
setIsLoading(false)
navigate("/login")
      })
      .catch((err) =>{
console.log(err);

        setIsLoading(false)
      });
  }
  return (
    <div className='h-[310px] px-4'>
      <div className="w-1/2 mx-auto">
        <h1 className="text-main text-3xl mb-5 font-bold">Set NewPassword</h1>
        <form onSubmit={formik.handleSubmit}>
        <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-extrabold text-gray-900 dark:text-white"
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
              htmlFor="newPassword"
              className="block mb-2 text-sm font-extrabold text-gray-900 dark:text-white"
            >
              NewPassword:
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              name="newPassword"
              type="password"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.newPassword}
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
              Set Password
            </button>}
          </div>
        </form>
      </div>
      <Helmet>
    <title>Create New Password</title>
   </Helmet>
    </div>
  );
}
