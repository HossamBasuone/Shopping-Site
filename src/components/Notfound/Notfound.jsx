import React from 'react'
import style from './Notfound.module.css'
import { Link } from 'react-router-dom'
export default function Notfound() {
  return (
<>
<h1 className='mt-20 bg-red-500 text-center p-4'> <i className="fa-regular fa-face-angry"></i> NO thing here You must come back <i className="fa-regular fa-face-angry"></i>  </h1>

<Link to={'/'}>
<button className='btn mt-3 font-bold '>
back to store
</button>

</Link>

</>

)
}
