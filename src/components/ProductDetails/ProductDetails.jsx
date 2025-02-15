import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addproductToCart, setnofcart, nofcart } = useContext(CartContext);
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [product, setProduct] = useState(null);
  let { id, category } = useParams();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    getProduct(id);
    getRelatedProducts();
  }, [id, category]);

  async function getProduct(id) {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  }

  async function getRelatedProducts() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let filteredProducts = res.data.data.filter((p) => p.category.name === category);
      setRelated(filteredProducts);
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  }

  async function addToCart(id) {
    let response = await addproductToCart(id);
    if (response.data.status === "success") {
      setnofcart(nofcart + 1); // ✅ Updates global cart count
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <div className="row items-center flex-col md:flex-row justify-evenly flex-nowrap">
        <div className="w-full md:w-1/4 mb-5">
          <Slider {...settings}>
            {product?.images.map((img, index) => (
              <img src={img} key={index} className="w-100" alt="Product" />
            ))}
          </Slider>
        </div>

        <div className="md:w-1/2 mb-3 md:p-15 lg:p-20 p-3 bg-zinc-300 rounded-lg">
          <h3 className="font-bold mb-2 text-emerald-600">{product?.title}</h3>
          <h4 className="text-orange-500">{product?.description}</h4>
          <h4 className="mt-3 font-semibold">{product?.category.name}</h4>
          <div className="flex justify-between p-3">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
        </div>
        
        <button onClick={() => addToCart(product.id)} className="btn">Add To Cart</button>
      </div>

      {related.length > 0 ? (
        <div className="flex flex-wrap flex-row">
          {related.map((product, index) => (
            <div key={index} className="w-1/2 md:w-1/4 lg:w-1/6">
              <div className="product border-slate-400 bg-zinc-200 border rounded-xl p-1 mt-10 mx-1 text-center my-1">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-emerald-400">{product.category.name}</h3>
                  <h3 className="font-semibold mb-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} LE</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button onClick={() => addToCart(product.id)} className="btn">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
}
