import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Categories() {
  const [show, setshow] = useState([])
async function getcategories(){
  let res =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  setshow(res.data.data);
 
  
}

useEffect(()=>{

  getcategories()
},[])



return (
  <>
    <h1 className="mx-auto p-2 mt-14 bg-black text-center text-4xl font-extrabold text-emerald-400">
      Products Categories
    </h1>

    <div className="row justify-center">
      {show.length === 0 ? ( 
        <span className="loader"></span>
      ) : (
        show?.map((one, index) => (
          <div key={index} className="md:w-1/2 lg:w-1/4">
            <Link to={`/Type/${one.name}`}>
              <div className="item p-3 bg-orange-600 m-2 border-4 border-slate-400 rounded-xl">
                <img src={one.image} className="w-[300px] h-[270px]" alt="" />
                <p className="text-center font-bold text-fuchsia-800 text-xl">
                  {one.name}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div> 
  </>
);
}