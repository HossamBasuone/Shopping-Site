import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [nofcart, setnofcart] = useState(0);
  const [cartid, setcartid] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addproductToCart(productId) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return error.response;
    }
  }

  function getcart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setcartid(res.data.data._id);

        setnofcart(res.data.numOfCartItems);

        return res;
      })

      .catch((err) => err);
  }

  function updatecartnumber(id, newcount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newcount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deletitem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteall() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function checkout(formdata) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,
        { shippingAddress: formdata },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        checkout,
        deleteall,
        addproductToCart,
        deletitem,
        getcart,
        updatecartnumber,
        setnofcart,
        nofcart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
