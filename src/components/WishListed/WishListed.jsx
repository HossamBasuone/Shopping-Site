import React, { useContext, useEffect, useState } from "react";
import style from "./WishListed.module.css";
import { wishlist } from "../../Context/wishlist";
import axios from "axios";
import { Link } from "react-router-dom";
export default function WishListed() {
  let { headers } = useContext(wishlist);
  const [wished, setwished] = useState([]);
  async function getwishlist() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers }
    );
    console.log(res.data.data);
    setwished(res.data.data);
  }
useEffect(() => {
    getwishlist();
  }, []);
  return (
    <>
    <h1 className='mx-auto mt-14 p-2  bg-black text-center text-4xl font-extrabold text-emerald-400'>
    good choice <i className="fas fa-heart text-red-600"></i>
  </h1>
      <div className="row">
        {wished?.map((product, index) => (
          <div key={index} className="  md:w-1/2 lg:w-1/3">
            <div className="product bg-slate-400 p-3 mt-10 rounded-xl mx-1 text-center my-1">
        <Link
     to={`/productdetails/${product._id}/${product.category.name}`}
>
            <img src={product.imageCover} className="w-full" alt="" />
            <p>Name: {product.title.split(" ").slice(0, 2).join(" ")}</p>
        <p>price : {product.price}</p> 
        </Link>          
 </div>

          </div>
        ))}
      </div>
    </>
  );
}
