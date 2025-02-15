import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* This will push the footer down when there is less content */}
      <div className="container w-[80%] mx-auto flex-grow py-14 lg:py-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
