import axios from "axios";
import React, { createContext } from "react";

export let wishlist = createContext();
export default function Wishlistprovider(props) {
    let headers = {
        token: localStorage.getItem("userToken"),
      };

      async function addwishlist(productId) {
        try {
          let response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            { headers }
          );
          return response;
        } catch (error) {
          console.error("Error adding to cart:", error);
          return error.response;
        }
      }
      async function deltefromwihslist(productId) {
        try {
          let response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers}
          );
          return response;
        } catch (error) {
          console.error("Error adding to cart:", error);
          return error.response;
        }
      }

    
    
  return <wishlist.Provider value={{addwishlist,headers,deltefromwihslist}}>
    {props.children}</wishlist.Provider>;
}
