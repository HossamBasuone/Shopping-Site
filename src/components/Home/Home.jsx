import React from 'react'
import style from './Home.module.css'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  return (
<>
<h1 className='mx-auto bg-black mt-16 p-3 text-center text-4xl font-extrabold text-emerald-400'>
welcome to our store
  </h1>
<MainSlider/>
<CategoriesSlider/>
<RecentProducts/>
</>

)
}
