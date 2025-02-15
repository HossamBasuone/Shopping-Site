import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { wishlist } from "../../Context/wishlist";

export default function RecentProducts() {
  const [spin, setSpin] = useState(false);
  const [spinId, setSpinId] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]); 

  let { data, isError, error, isLoading } = useProducts();
  let { addproductToCart, setnofcart, nofcart } = useContext(CartContext);
  let { addwishlist, deltefromwihslist, headers } = useContext(wishlist);

  async function getWishlist() {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      let wishlistIds = res.data.data.map((item) => item._id);
      setWishlistItems(wishlistIds);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  
  async function toggleWishlist(id) {
    let updatedWishlist;
    if (wishlistItems.includes(id)) {
      await deltefromwihslist(id);
      updatedWishlist = wishlistItems.filter((item) => item !== id);
      toast.success("Removed from wishlist");
    } else {
      await addwishlist(id);
      updatedWishlist = [...wishlistItems, id];
      toast.success("Added to wishlist");
    }
    setWishlistItems(updatedWishlist);
  }

  async function addToCart(id) {
    setSpinId(id);
    setSpin(true);
    let response = await addproductToCart(id);

    if (response.data.status === "success") {
      setnofcart(nofcart + 1);
      toast.success(response.data.message, { autoClose: 30 });
    } else {
      toast.error(response.data.message, { autoClose: 1000 });
    }
    setSpin(false);
  }

  if (isLoading) {
    return <span className="loader"></span>
  }
  if (isError) {
    return <h3 className="text-red-600 bg-black rounded-lg">{error.message}</h3>;
  }

  return (
    <div className="flex flex-wrap flex-row justify-center">
      {data?.data?.data.map((product) => (
        <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/5">
          <div className="product border-slate-400 bg-zinc-200 border rounded-xl p-1 mt-10 mx-1 text-center my-1">
            <Link to={`productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full h-50" alt="" />
              <h3 className="text-emerald-400">{product.category.name}</h3>
              <h3 className="font-semibold mb-3">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex justify-between p-3">
                <span className="font-semibold">{product.price} LE</span>
                <span>
                  <i className="fas fa-star text-yellow-400"></i>
                  {product.ratingsAverage}
                </span>
              </div>
            </Link>
            <button onClick={() => addToCart(product.id)} className="btn">
              {spin && spinId === product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>


            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-full"
            >
              <i
                className={`fa-solid fa-heart text-[20px] ${
                  wishlistItems.includes(product.id) ? "text-red-600" : "text-gray-600"
                }`}
              ></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
