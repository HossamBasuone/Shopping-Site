import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import logo from "../../assets/freshcart-logo.png";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {

  let{setnofcart,nofcart,getcart}=useContext(CartContext)
  let navigate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }
useEffect(()=>{
getcart()
},[])
  return (
    <>
      <nav className="bg-slate-600 fixed top-0 right-0 z-10 left-0  border-gray-200">
        <div className="flex flex-wrap items-center justify-between  mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="">
              <img src={logo} className="h-7" alt="Logo" />
            </Link>
          </div>
        

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 ">
            {UserLogin && (
              <ul className="flex gap-3">
                <li>
                  <NavLink className="text-white font-extrabold" to="">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white relative font-semibold " to="cart">
                    Cart
                {nofcart==0?null:<div className=" absolute left-[-9px]  flex items-center justify-around  text-black bg-emerald-400 py-1 rounded-full px-3"><i className="fa-solid fa-cart-shopping me-2"></i>
                    <span className="font-extrabold text-white">{nofcart}</span>
                    </div>}    
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white font-semibold" to="products">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white font-semibold" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white font-semibold" to="brands">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white font-semibold" to="wishlist">
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-white font-semibold" to="allorders">
                    All Orders
                  </NavLink>
                </li>
              </ul>
              
            )}
   <div className="flex justify-center gap-4">
              {UserLogin ? (
                <span
                  className="cursor-pointer text-red-600 font-extrabold"
                  onClick={signout}
                >
                  Signout
                </span>
              ) : (
                <>
                  <Link to="login" className="text-white">
                    Login
                  </Link>
                  <Link to="register" className="text-white">
                    Register
                  </Link>
                </>
              )}
            </div>          </div>

          {/* Mobile Menu - Appears when toggled */}
          {isOpen && (
            <div className="absolute top-14 left-0 w-full bg-slate-700 md:hidden">
              <ul className="flex flex-col items-center gap-3 p-4">
                {UserLogin ? (
                  <>
                    <li>
                      <NavLink className="text-white font-extrabold" to="" onClick={() => setIsOpen(false)}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold relative   " to="cart" onClick={() => setIsOpen(false)}>
                        <div className="">Cart</div>
                        {nofcart==0?null:  <div className=" absolute top-0  left-9 flex items-center justify-around   text-black bg-emerald-400 p-1 rounded-full px-4"><i className="fa-solid fa-cart-shopping  me-2"></i>
                    <span className="font-extrabold text-white">{nofcart}</span>
                    </div>}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold" to="products" onClick={() => setIsOpen(false)}>
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold" to="categories" onClick={() => setIsOpen(false)}>
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold" to="brands" onClick={() => setIsOpen(false)}>
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold" to="wishlist" onClick={() => setIsOpen(false)}>
                        wishlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-white font-semibold" to="allorders" onClick={() => setIsOpen(false)}>
                        All Orders
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="login" className="text-white" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="register" className="text-white" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <div className="flex justify-center gap-4">
              {UserLogin ? (
                <span
                  className="cursor-pointer text-red-600 font-extrabold"
                  onClick={signout}
                >
                  Signout
                </span>
              ) : (
                <>
                  <Link to="login" className="text-white">
                    Login
                  </Link>
                  <Link to="register" className="text-white">
                    Register
                  </Link>
                </>
              )}
            </div>
            </div>
          )}

          {/* Social Media & Signout/Login */}
          <div className=" md:flex items-center space-x-6">
            <ul className="flex gap-2">
              <li>
                <i className="fab fa-facebook text-white"></i>
              </li>
              <li>
                <i className="fab fa-youtube text-white"></i>
              </li>
              <li>
                <i className="fab fa-instagram text-white"></i>
              </li>
              <li>
                <i className="fab fa-twitter text-white"></i>
              </li>
              <li>
                <i className="fab fa-linkedin text-white"></i>
              </li>
            </ul>
           
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
          
        </div>
      </nav>
    </>
  );
}
