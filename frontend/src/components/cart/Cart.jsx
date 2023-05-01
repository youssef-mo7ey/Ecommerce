import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, d, l } from "../../redux/Features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { u } from "../../redux/Features/usersSlice";
import { BsFillTrashFill } from "react-icons/bs";
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
    dispatch(getCart(user.id))
  }

  const handleDel = (i) => {
    const object1 = {
      userId: user.id,
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
    <div className="absolute z-[100] flex flex-col top-14 min-w-[280px] text-white rounded-md -right-[45%] mt-4 p-2  bg-black float-right">
      <div className="refresh flex justify-end cursor-pointer text-2xl hover:opacity-70 active:opacity-50" onClick={handleRefresh}><BiRefresh/></div>
      {Array.isArray(data) && !loading > 0 ? (
        data?.map((item,i) => {
          return (
            <div key={item?.id+i}>
              <div className="flex container items-center justify-between p-2">
                <div className="flex container w-full">
                  <img src={item.img1} className="w-[50px]" alt="" />
                  <p className="pl-2">{item.name}</p>
                </div>
                <div className="p-4 font-bold">{item.size}</div>
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
          <div className="cart-buffer w-[30px] h-[30px] border-[4px] m-2 border-white border-l-transparent rounded-full">

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
  );
};

export default Cart;
