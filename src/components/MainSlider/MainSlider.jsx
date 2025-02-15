import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "../../assets/slider-image-2.jpeg"
import slider2 from "../../assets/slider-image-3.jpeg"
import slider3 from "../../assets/grocery-banner.png"
import slider4 from "../../assets/blog-img-1.jpeg"
import slider5 from "../../assets/blog-img-2.jpeg"
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
<>
<div className=" mt-5 mb-5 flex flex-col md:flex-row md:row ">
  <div className="md:w-3/4 md:mb-0  mb-5">
  <Slider {...settings}>
  <img src={slider3} className='  h-[400px] object-cover'  alt="" />
  <img src={slider4} className='w-full h-[400px] object-cover' alt="" />
  <img src={slider5} className='w-full h-[400px] object-cover' alt="" />
  </Slider>

  </div>
  <div className="w-full md:w-1/4 flex  md:flex-col">
  <img src={slider1} className='w-1/2 md:w-full   md:h-[200px]' alt="" />
  <img src={slider2} className='w-1/2 md:w-full md:h-[200px]' alt="" />
  </div>
</div>





</>

)
}
