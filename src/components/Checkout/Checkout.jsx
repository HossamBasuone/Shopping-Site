import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const [ApiError, setApiError] = useState("");
  const [isloading, setisloading] = useState(false);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  let{checkout}=useContext(CartContext)
 async function handlecheckout() {
let res = await checkout(formik.values)
console.log(res.data.session.url);
window.location.href= res.data.session.url

 
  }

  let myvalidation = yup.object().shape({
    details: yup.string("please describe your location"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "enter valid number"),
    city: yup.string("please enter your location location"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    validationSchema: myvalidation,
    onSubmit: ()=>handlecheckout(),
  });

  return (
    <>
  
      <div className="mx-auto w-1/2 text-center  text-green-400 text-2xl font-bold">
        Checkout payment
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-md f mt-5 bg-yellow-100 font-bold border-4  rounded-xl  p-2 border-emerald-400  mx-auto">
        <div className="relative py-11  mt-4 z-0 w-full mb-5 group">
          <input
          
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium  absolute  textlgm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
          >
            User Name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium ">{formik.errors.name} </span>
            </div>
          ) : null}
        </div>


        <div className="relative py-11 z-0 w-full mb-5 group">
          <input
           
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium  absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium ">{formik.errors.phone} </span>
            </div>
          ) : null}
        </div>
        
        <div className="relative py-10 z-0 w-full mb-5 group">
          <input
          
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium  absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
          >
            Your city
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium ">{formik.errors.name} </span>
            </div>
          ) : null}
        </div>



        <div className="flex flex-col  gap-y-4 items-center md:flex-row justify-center">
          
          <button
            type="submit"
            className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Checkout
          </button>
         
        </div>
      </form>
    </>
  );
}
