import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, d, l } from "../../redux/Features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { u } from "../../redux/Features/usersSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {BiRefresh} from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import "./cart-styles.css"

const Cart = ({ setCartModal }) => {
  const user = useSelector(u);
  const dispatch = useDispatch();
  const data = useSelector(d);
  const loading = useSelector(l);
  const navigate = useNavigate();

  const handleRefresh=()=>{
    dispatch(getCart(user?.id))
  }

  const handleDel = (i) => {
    const object1 = {
      userId: user?.id || JSON.parse(localStorage.getItem("guest")).userId,
      id: i.id,
      size: i.size,
    };
    dispatch(removeFromCart(object1));
  };

  const handleProceedToCheckOut = () => {
    setCartModal(false);
    navigate("/checkout");
  };

  return (
  <>
    <div className="background fixed top-0 left-0 right-0 bg-black opacity-50 h-[100vh] hidden xs:block" onClick={()=>setCartModal(false)}></div> 
    <div className="absolute z-[100] flex flex-col top-14 min-w-[25vw] text-white rounded-md -right-[45%] mt-4 p-2 bg-black float-right xs:right-[0] xs:-top-[3%] xs:fixed xs:h-[103vh] xs:w-[50vw] xs:bg-white xs:text-black">
    <div className="flex justify-between mt-2">
      <div className="refresh cursor-pointer text-2xl hover:opacity-70 active:opacity-70 xs:justify-start" onClick={handleRefresh}><BiRefresh/></div>
      <div className="exit cursor-pointer text-2xl hidden hover:opacity-70 xs:block active:opacity-70" onClick={()=>setCartModal(false)}><AiOutlineClose/></div>
    </div>
      {Array.isArray(data) && !loading > 0 ? (
        data?.map((item,i) => {
          return (
            <div key={item?.id+i}>
              <div className="flex container items-center justify-between p-2">
                <div className="flex container w-full">
                  <img src={item.img1} className="w-[50px]" alt="" />
                  <p className="pl-2 ">{item.name}</p>
                </div>
                <div className="p-4 xs:p-0 font-bold">{item.size}</div>
                <div className="p-4 font-bold flex">x{item.numOfItem}</div>
                <div className="flex flex-col items-center justify-between">
                  <p className="pb-2">{item.price}$</p>
                  <div>
                    <BsFillTrashFill
                      onClick={() => handleDel(item)}
                      className="text-red-700 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <hr className="mb-2" />
            </div>
          );
        })
      ) : (
        loading ?(<div className="flex justify-center">
          <div className="cart-buffer w-[30px] h-[30px] border-[4px] m-2 border-white xs:border-black xs:border-l-transparent border-l-transparent rounded-full">

          </div>
        </div>):
        <p className="text-center font-bold">Nothing Here</p>
      )}
      {Array.isArray(data) && !loading && (
        <button
          onClick={handleProceedToCheckOut}
          className="bg-[#40884a] select-none text-white font-bold p-2 rounded-sm hover:opacity-80"
        >
          Proceed To Checkout
        </button>
      )}
    </div>
  </>
    
  );
};

export default Cart;
