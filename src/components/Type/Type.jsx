import React, { useEffect, useState } from 'react'
import style from './Type.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { use } from 'react';
import img1 from "../../assets/Im Sorry GIF by Lucas and Friends by RV AppStudios.gif"

export default function Type() {
  const [related, setrelated] = useState([])

let {categoies}=useParams();

 async function showcategory(){
 await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res)=>{
  // console.log(res.data.data);
  
let related = res.data.data.filter((product)=> product.category.name == categoies)
// console.log(related);

setrelated(related)
})

}

// console.log(related);

useEffect(()=>{
  showcategory()
},[])

return (
<>
{related==0?<div className='flex flex-col items-center

p-5 text-center font-bold rounded-lg'><h1 className='text-red-600 font-extrabold '>Sorry we dont have products for this category</h1>
<Link to={`/`}><button className='bg-emerald-600 p-3 my-5 rounded-2xl'> back to home </button>
</Link>
<img src={img1} className= "md:w-[50%]" alt="" />
</div>:
        <div className="flex flex-wrap flex-row">
          {related?.map((product,index) => (
            <div key={index} className="w-1/2 md:w-1/4 lg:w-1/6">
              <div className="product border-slate-400  bg-zinc-200 border rounded-xl p-1 mt-10  mx-1 text-center my-1 ">
                <Link
                  to={`/Type/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="te2xt-emerald-400 ">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-3">
                    {product.title.split(" ").slice(0, 2).join()}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} LE</span>
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
      
        }

</>

)
}
