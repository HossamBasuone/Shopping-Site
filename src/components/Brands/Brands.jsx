import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'

export default function Brands() {

const [brands, setbrands] = useState([])
async function getbrands(){
  let res=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  
  setbrands(res.data.data)
  
}


useEffect(()=>{

  getbrands();
},[])





  return (
<>
<h1 className='mx-auto p-2 mt-14 bg-black text-center text-4xl font-extrabold text-emerald-400'>
 Our  brands
  </h1>
  {brands.length==0?<span className='loader'></span>:(
      <div className='row gap-y-4 flex justify-center '>
      {brands?.map((brand, index)=> <div className=' md:w-1/2 lg:w-1/3' key={index}>
    <div className="item  flex  items-center justify-between border-4 rounded-full bg-slate-800 text-white mx-2 px-10 py-4 w-auto">
    <img src={brand.image} className='w-1/2' alt="" />
    <p className='font-bold text-2xl text-emerald-400'>{brand.name}</p>
    </div>
      </div> )}
      </div>
  )}

  </>

)
}