import React, { useContext, useState } from "react";
import style from "./Products.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../Hooks/useProducts";
import axios from "axios";

export default function Products() {
  let { data, isError, error, isLoading } = useProducts();

  if (isLoading) {
    return <span className="loader"></span>;
  }
  if (isError) {
    return (
      <>
        <h3 className="text-red-600 bg-black rounded-lg">{error.message}</h3>
      </>
    );
  }

  return (
    <>
      <h1 className="bg-black mt-14 p-2 mx-auto text-center text-4xl font-extrabold text-emerald-400">
        All products
      </h1>
      {data.lenght == 0 ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-wrap flex-row">
          {data?.data?.data.map((product) => (
            <div key={product.id} className="  md:w-1/2 lg:w-1/3">
              <div className="product border-slate-400 bg-orange-600 p-3 border-4 mt-10 rounded-xl mx-1 text-center my-1">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="te2xt-emerald-400 ">
                    <span className="text-emerald-400 font-bold text-xl">
                      Type
                    </span>
                    : {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-3">
                    <span className="text-emerald-400 text-xl font-bold">
                      Name
                    </span>
                    : {product.title.split(" ").slice(0, 2).join()}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span className="font-semibold">{product.price} LE</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn ">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
