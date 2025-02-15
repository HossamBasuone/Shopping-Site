import React, { useEffect, useState } from 'react';
import style from './Allorders.module.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function Allorders() {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(token);
  const tokenid = decodedToken.id;

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true); 

  async function getAllOrders() {
    try {
      setLoading(true); 
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${tokenid}`);
      console.log(res);
      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <h1 className='mx-auto bg-black p-2 mt-14 text-center text-4xl font-extrabold text-emerald-400'>
        You Will Receive
      </h1>

      <div className='row flex-col'>
        {loading ? (
          <span className='loader mx-auto my-10'></span> // ✅ Show loading spinner
        ) : order.length === 0 ? (
          <h2 className="text-center text-xl font-bold text-red-500 bg-black p-3 ">You dont have any thing yet </h2>
        ) : (
          order.map((product, index) => (
            <div key={index} className='border-8 bg-blue-400 my-2 gap-4 flex flex-col p-4 border-red-100'>
              <h1 className='text-center font-extrabold bg-black text-orange-400'>
                Total Price: {product.totalOrderPrice}
              </h1>
              {product.cartItems.map((item, count) => (
                <div className="bg-orange-200 flex justify-center items-center" key={count}>
                  <img src={item.product.imageCover} className='w-1/2 md:w-1/4 lg:h-[250px]' alt="" />
                  <div className='flex flex-col justify-between w-full p-3'>
                    <div className='flex flex-col gap-3'>
                      <p>Count: {item.count}</p>
                      <p>Price: {item.price}</p>
                      <p>Name: {item.product.title.split(" ").slice(0, 2).join(" ")}</p>
                    </div>
                    <div className='flex justify-around'>
                      <p>{item.product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></p>
                      <p>{item.product.ratingsQuantity} <i className="fa-solid fa-users"></i></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}
