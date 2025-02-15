import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { setUserLogin } = useContext(UserContext);
  const [ApiError, setApiError] = useState("");
  const [isloading, setisloading] = useState(false);
  let navigate = useNavigate();

  function handleregister(values) {
    setisloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);
        navigate("/");
      })
      .catch((error) => {
        setApiError(error.response?.data?.message || "An error occurred");
        setisloading(false);
      });
  }

  let myvalidation = yup.object().shape({
    name: yup.string().min(3, "Min length is 3").max(18, "Max length is 18").required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Min length is 6").max(12, "Max length is 12"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password is required"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myvalidation,
    onSubmit: handleregister,
  });

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-4">Register</h2>
        {ApiError && <div className="text-red-500 text-center mb-4">{ApiError}</div>}
        <form onSubmit={formik.handleSubmit}>
          {[
            { label: "User Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
            { label: "Confirm Password", type: "password", name: "rePassword" },
            { label: "Phone", type: "tel", name: "phone" },
          ].map(({ label, type, name }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              {formik.errors[name] && formik.touched[name] && (
                <p className="text-red-500 text-sm">{formik.errors[name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            disabled={isloading}
          >
            {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
