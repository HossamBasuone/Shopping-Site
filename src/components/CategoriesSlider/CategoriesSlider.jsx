import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [slider, setslider] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 0,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768, // Mobile screens (768px or less)
        settings: {
          slidesToShow: 2, // Show 2 images
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet screens (1024px or less)
        settings: {
          slidesToShow: 4, // Show 4 images
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getCategories() {
    
 await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{
    setslider(res.data.data)
  })
  
  }

  useEffect(()=>
  {
getCategories()
  },[])
  return (
<>
<h2 className='font-bold text-emerald-600 p-2 mb-3 capitalize bg-black'>Show Popular categroies </h2>
<Slider {...settings}>
  
{slider.map( (p)=> <div key={p._id}>
  <img src={p.image} className='  w-full h-[350px]  md:h-[200px] object-cover' alt="" />
  <h4 className='text-center mt-2 font-semibold'>{p.name}</h4>

</div> )}

</Slider>
 
</>

)
}
