import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  const [ApiError, setApiError] = useState("");
  const [isloading, setisloading] = useState(false);
  let navigate = useNavigate();

  function handlelogin(values) {
    setisloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);
        navigate("/");
      })
      .catch((res) => {
        setApiError(res.response.data.message);
        setisloading(false);
      });
  }

  let myvalidation = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Min length is 6")
      .max(12, "Max length is 12"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: myvalidation,
    onSubmit: handlelogin,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-center text-white font-bold rounded-lg p-3 mb-6">
          {ApiError}
        </div>
      ) : null}
      <div className="mx-auto w-1/2 text-center text-green-400 text-2xl font-bold">
        Login Page
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mt-5 bg-yellow-100 font-bold border-4 rounded-xl p-2 border-emerald-400 mx-auto"
      >
        {/* Email Field */}
        <div className="relative py-10 z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="relative py-10 z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
          >
            Enter your password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-y-4 items-center md:flex-row justify-center">
          <button
            type="submit"
            className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-5 text-center">
          Don't have an account?{" "}
          <Link to={"/register"}>
         
            <span className="text-blue-600 font-bold">Register Now</span>
          </Link>
          <Link to={"/forget"}>
            <span className="text-blue-600 font-bold">
<p className="text-orange-400 ">             Forget Password
</p>           
</span>
          </Link>
        </div>
      </form>
    </>
  );
}
