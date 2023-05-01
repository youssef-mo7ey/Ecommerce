import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { u, logOut, reset,updatePhoneOrAddress  } from "../../redux/Features/usersSlice";
import Cart from "../../components/cart/Cart";
import Checkout from "../Checkout/Checkout";
import { getCart,resetCart } from "../../redux/Features/cartSlice";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";


const Account = () => {
  let [selector, setSelector] = useState(0);
  const [phoneNum, setPhoneNum] = useState("");
  const [addr, setAddr] = useState("");
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [addrEdit, setAddrEdit] = useState(false);

  let dispatch = useDispatch();
  let user = useSelector(u);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
    dispatch(resetCart());
    navigate("/");
  };

  const handlePhone = async () => {
    const addPhone = await axios.patch(
      "http://localhost:3000/users/phone/" + user.id,
      { phone: phoneNum }
    );

    dispatch(updatePhoneOrAddress({phone:phoneNum}))
    setPhoneEdit(false);
    setAddrEdit(false);
  };
  const handleAddress = async () => {
    const addAddress = await axios.patch(
      "http://localhost:3000/users/address/" + user.id,
      { address: addr }
    );

    dispatch(updatePhoneOrAddress({address:addr}))
    setPhoneEdit(false);
    setAddrEdit(false);
  };
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="text-3xl text-center py-5">Hello , {user.username}</div>
      <hr />
      <div className="flex h-full min-h-[100vh]">
        <div className="text-white text-2xl left-side flex flex-col justify-between w-[25%] bg-black">
          <div>
            <div
              onClick={() => setSelector(0)}
              className="p-5 select-none cursor-pointer hover:text-black hover:bg-white transition-colors"
            >
              Account Information
            </div>
            <div
              onClick={() => setSelector(2)}
              className="p-5 select-none cursor-pointer hover:text-black hover:bg-white transition-colors"
            >
              Cart
          </div>
          </div>
          <div className="flex justify-center py-[20%] items-end">
            <button
              onClick={handleLogOut}
              className="bg-red-700 text-white font-bold text-[16px] px-7 py-1 mb-2 rounded-md hover:opacity-[0.7] cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
        <div className="right-side p-10">
          {selector === 0 && (
            <div className="account-info flex flex-col gap-2">
              <div className="email">
                <p className="font-bold text-md">Email</p>
                <p>{user.email}</p>
              </div>
              <div className="phone-number">
                <div className="flex justify-between w-[15rem] select-none">
                  <p className="font-bold text-md">Phone</p>
                  <span
                    onClick={() => {
                      setPhoneEdit((prev) => !prev);
                    }}
                    className="font-bold text-md cursor-pointer"
                  >
                    <BiEditAlt className=" text-2xl hover:opacity-70 active:opacity-50" />
                  </span>
                </div>
                <div>
                  {user?.phone && !phoneEdit ? (
                    <>{user.phone}</>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {" "}
                      <input
                        placeholder="Add phone number"
                        className="px-2"
                        onChange={(e) => setPhoneNum(e.target.value)}
                      />{" "}
                      <button
                        onClick={handlePhone}
                        className="bg-black rounded-md text-white p-2 w-[50%]"
                      >
                        Add Phone
                      </button>{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="address">
                <div className="flex justify-between w-[15rem] select-none">
                  <p className="font-bold text-md">Address</p>
                  <span
                    onClick={() => {
                      setAddrEdit((prev) => !prev);
                    }}
                    className="font-bold text-md cursor-pointer"
                  >
                    <BiEditAlt className=" text-2xl hover:opacity-70 active:opacity-50" />
                  </span>
                </div>
                <div>
                  {user?.address && !addrEdit ? (
                    <>{user.address}</>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {" "}
                      <input
                        placeholder="Add New Address"
                        className="px-2"
                        onChange={(e) => setAddr(e.target.value)}
                      />{" "}
                      <button
                        onClick={handleAddress}
                        className="bg-black rounded-md text-white p-2 w-[60%]"
                      >
                        Add Address
                      </button>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {selector === 2 && (
            <div className="flex">
              <Checkout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
