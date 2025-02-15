import React from "react";

export default function Footer() {
  return (
    <div className="bg-sky-800 text-center text-white font-bold text-3xl w-full relative py-4">
      <div className="brands mt-3 flex justify-center gap-4">
        <div className="bg-sky-700 flex items-center justify-center w-12 h-12 rounded-full">
          <i className="fa-brands fa-facebook-f text-white"></i>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center w-12 h-12 rounded-full">
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className="bg-black flex items-center justify-center w-12 h-12 rounded-full">
          <i className="fa-brands fa-x-twitter text-white"></i>
        </div>
        <div className="bg-[#0073b2] flex items-center justify-center w-12 h-12 rounded-full">
          <i className="fa-brands fa-linkedin text-white"></i>
        </div>
        <div className="bg-red-600 flex items-center justify-center w-12 h-12 rounded-full">
          <i className="fa-brands fa-youtube text-white"></i>
        </div>
      </div>
      <br />
      <div className="h-[5px] w-full bg-white"></div>
      <div>© 2024 All Rights Reserved ;)</div>
    </div>
  );
}
