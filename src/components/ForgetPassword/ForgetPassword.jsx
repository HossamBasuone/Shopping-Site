import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [firstcheck, setFirstCheck] = useState("");
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState(""); // Store the reset code entered by the user
  let navigate = useNavigate();

  async function forgetpass(userEmail) {
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        { email: userEmail }
      );
      console.log(res);
      setFirstCheck(res.data.statusMsg);
    } catch (error) {
      console.error(error);
    }
  }

  async function resestcode() {
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode: reset } // Send the reset code to API
      );
      navigate('/ResetPassword')
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-20 text-center bg-red-400 p-3 flex flex-col gap-y-3">
      <input
        className="bg-black text-white p-2 rounded"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 ml-2 rounded"
        onClick={() => forgetpass(email)}
      >
        Enter Your Email
      </button>
      <p>When you enter your email, you will receive a verification code.</p>

      {firstcheck === "success" && (
        <>
          <hr />
          <label className="mt-5 bg-yellow-300" htmlFor="code">
            Please enter the code you received
          </label>
          <input
            type="text"
            className="mt-4 p-2 border border-gray-400 rounded"
            placeholder="Enter verification code"
            value={reset}
            onChange={(e) => setReset(e.target.value)} // Update state when user types
          />
          <button className="btn bg-green-500 p-2 text-white rounded" onClick={resestcode}>
            Submit Code
          </button>
        </>
      )}
    </div>
  );
}
