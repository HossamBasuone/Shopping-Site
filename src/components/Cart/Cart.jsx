import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import img1 from "../../assets/Buy It GIF by FOMO Duck.gif"

export default function Cart() {
  let {deletitem, getcart,updatecartnumber,deleteall,nofcart,setnofcart } = useContext(CartContext);
  const [items, setitems] = useState(null);
  
  async function updatenumber(id ,count){
  let res =await updatecartnumber(id,count)
  console.log(res);
  setitems(res.data.data)
  
   }
  
  async function getcartitem() {
    let response = await getcart();
    if (response.data.status == "success") {
      setitems(response.data.data);
    }
  }
 async function dleted(id){

 let response=  await deletitem(id)
setitems(response.data.data)
setnofcart(nofcart-1)
}
async function deletecart(){
let res= await deleteall();
setitems(res.data.data)

}

  useEffect(() => {
    getcartitem();
  }, []);
  return (
    <>
    {items?.products.length >0 ? <>
      <h2 className="mt-14 bg-black text-white p-2 font-bold mb-3  text-center text-2xl">
        total price ={" "}
        <span className="font-bold text-emerald-500">
          {items?.totalCartPrice}{" "}
        </span>
        LE
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.products.map((product,index) => (
              <tr
                key={index}
                className="bg-white border-b  border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                    onClick={()=>updatenumber(product.product.id,product.count-1)}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-white bg-red-600 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span className="text-xl text-black">{product.count}</span>
                    </div>
                    <button
                                        onClick={()=>updatenumber(product.product.id,product.count+1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-white bg-green-600 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.price * product.count} LE
                </td>
                <td className="px-6 py-4">
                  <span
                  onClick={()=> dleted(product.product.id)}
                    className="font-medium  cursor-pointer text-red-600  hover:text-green-600"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center  mt-3 flex ">
        <Link className="w-full" to={'/checkout'}>
        <button  className="bg-emerald-600 text-3xl w-full   text-white px-7 py-2 font-bold rounded-[80px]">Checkout</button>
        </Link>
        <button onClick={()=>{deletecart();setnofcart(0)}} className="bg-black text-3xl w-[50%] text-red-600 px-7 py-2 font-bold rounded-[80px]">Clear</button>
        </div>
    </>:<div className=' flex  mt-14 flex-col items-center py-3 p-5 text-center font-bold rounded-lg'><h1 className="font-extrabold text-red-600 p-3 bg-black">You dont have but any thing yet</h1>
    <Link to={`/`}><button className='bg-emerald-600 p-3 my-5 rounded-2xl'> back to home </button>
    </Link>
    <img src={img1} className="md:w-[50%] " alt="" />
    </div>
    }
    </>
  );
}
