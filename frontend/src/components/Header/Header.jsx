import React, { useState,useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi"
import Cart from "../cart/Cart";
import { useSelector,useDispatch } from "react-redux";
import { sf, u } from "../../redux/Features/usersSlice";
import { getCart, d, l, e } from "../../redux/Features/cartSlice";

const Header = () => {
  let [cartModal, setCartModal] = useState(false);
  let [showMenu,setShowMenu]=useState(false)
  let user = useSelector(u);
  let signedFlag=useSelector(sf)
  let data = useSelector(d);
  
  const dispatch =useDispatch()
  
  useEffect(() => {
    dispatch(getCart(user?.id));
  }
  , [dispatch]);
  

  return (
    <>
      <div className="header flex justify-between p-4 bg-black">
        <div className="left  cursor-pointer justify-start">
          <div className=" flex items-start visible xs:hidden  ">
            <Link to="/">
              <p className=" select-none hover:opacity-[0.7] text-xl text-[#fff] pl-5 ">
                Home
              </p>
            </Link>
            <Link to="/products">
              <p className=" select-none hover:opacity-[0.7] text-xl text-[#fff] pl-5 ">
                Products
              </p>
            </Link>
            {user?.username && (
              <Link to="/likes">
                <p className=" select-none hover:opacity-[0.7]  text-xl text-[#fff] pl-5">
                  Likes
                </p>
              </Link>
            )}
                    
          </div>
          <div onClick={()=>{setShowMenu((prev)=>!prev)}} className="drop-down hidden xs:block">
            <GiHamburgerMenu className="menu-icon text-white text-[30px] cursor-pointer hidden xs:block hover:opacity-75 active:opacity-50"/>
            <div className={`${showMenu?"block":"hidden"}`}>
              <Link to="/">
                <p className="py-2 select-none hover:underline transition-all hover:opacity-[0.7] text-xl text-[#fff] ">
                  Home
                </p>
              </Link>
              <Link to="/products">
                <p className="py-2 select-none hover:underline transition-all hover:opacity-[0.7] text-xl text-[#fff] ">
                  Products
                </p>
              </Link>
              {user?.username && (
                <Link to="/likes">
                  <p className="py-2 select-none hover:underline transition-all hover:opacity-[0.7]  text-xl text-[#fff]">
                    Likes
                  </p>
                </Link>
              )}
              {user?<Link to={`/account/${user.id}`} className="py-2 select-none hover:underline transition-all hover:opacity-[0.7] capitalize text-xl text-[#fff]">{user.username}</Link>:
              <Link to="/signin" className="py-2 select-none hover:opacity-[0.7] hover:underline transition-all  text-xl text-[#fff]">Signin</Link>}
            </div> 
          </div>
        </div>
        <div className="middle">
          <Link to="/">
            <h2 className=" select-none font-bold text-3xl text-white">ECommerce</h2>
          </Link>
        </div>
        <div className="right mr-5 flex gap-4 select-none justify-between ">
          <div className="icons flex gap-4">
            <div className="cart relative top-1  xs:block">
              <div
                onClick={() => setCartModal((prev) => !prev)}
                className="hover:opacity-[0.7] cursor-pointer "
              >
                <span className=" text-[11px] -top-2 left-3 absolute  text-white z-10 font-bold bg-blue-900 px-[5px] mt-[1px] py-[1px] rounded-full">
                  {Array.isArray(data)? data.length : 0}
                </span>
                <AiOutlineShoppingCart className=" text-2xl text-white xs:absolute  " />
              </div>
              {cartModal && (
                <div className="triangle absolute top-[133%] rotate-[180deg] "></div>
              )}
              {cartModal && <Cart setCartModal={setCartModal} />}
            </div>
            {user?.username ? (
              <Link
                className="text-white flex gap-3 hover:opacity-[0.8] text-xl xs:hidden"
                to={`/account/${user.id}`}
              >
                
                {user.username}
              </Link>
            ) : (
              <Link to="/signin">
                
                <AiOutlineUser className="text-2xl text-white xs:hidden   hover:opacity-[0.7] cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
