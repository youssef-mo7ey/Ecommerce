import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  d,
  l,
  removeFromCart,
  handleCheckOut,
  resetCart,
} from "../../redux/Features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { numOfItem } from "../../redux/Features/numberOfItems";
import { u } from "../../redux/Features/usersSlice";
import { useState } from "react";
import CheckoutModal from "../../components/checkout Modal/CheckoutModal";
import LoadingPage from "../../components/loading page/LoadingPage";
const Checkout = () => {
  const [product, setProduct] = useState();
  const [modal, setModal] = useState(false);
  const cart = useSelector(d);
  const loading = useSelector(l);
  const navigate = useNavigate();
  const user = useSelector(u);
  const dispatch = useDispatch();
  let total = 0;
  const handleRemove = (i) => {
    const obj = {
      userId: user?.id || JSON.parse(localStorage.getItem("guest")).userId,
      id: i.id,
      size: i.size,
    };
    dispatch(removeFromCart(obj));
  };

  const handleCheckOut2 = () => {
    if (!user || !user.address || !user.phone) {
      setModal(true);
    } else {
      navigate("/deliveryontheway");
      dispatch(handleCheckOut(user.id));
      dispatch(resetCart())
    }
  };

  if(loading) return <LoadingPage/>

  return (
    <>
      {modal && <CheckoutModal setModal={setModal} />}
      <div className="px-10 py-5 w-full">
        {!Array.isArray(cart) ? (
          <p className="flex flex-col items-center justify-between text-3xl font-bold p-10">
            {" "}
            Please Add To Cart And Come Back {":)"}{" "}
            <span className="text-blue-700 text-lg font-normal hover:opacity-[0.7]  active:text-red-700">
              <Link to="/" className="flex items-center">
                <AiOutlineArrowLeft className="mr-2" /> back to home
              </Link>
            </span>
          </p>
            
        ) : 
        (

          Array.isArray(cart)&&cart.map((item,i) => {
            if (item.numOfItem > 1) {
              total += item.price * item.numOfItem;
            } else {
              total += item.price;
            }
            return (
              <div key={item.id+i}>
                <div className="flex flex-col p-8 xs:px-0">
                  <div className="flex justify-between items-center bg-gray-200 p-3">
                    <div className="flex ">
                      <img src={item.img1} alt="" className="w-[25%] min-w-[80px]" />
                      <p className="pl-[20px] text-2xl mt-6 xs:px-2">{item.name}</p>
                    </div>
                    <div className="text-2xl text-gray-500">{item.size}</div>
                    <div className="text-gray-600 text-xl mr-10 xs:m-0 flex flex-col items-center justify-between">
                      <p className="text-black font-bold">{item.price}$</p>
                      <p className="mt-[50%] mb-2">x{item.numOfItem}</p>
                      <p
                        onClick={() => handleRemove(item)}
                        className="text-red-700 bg-white px-2 py-1 rounded-md select-none text-[15px] font-semibold flex items-center cursor-pointer hover:opacity-75 active:opacity-50"
                      >
                        Remove <BsFillTrashFill className="ml-2 hover:opacity-75 active:opacity-50" />
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
        {Array.isArray(cart) && (
          <>
            <p className="text-black font-bold p-3 float-right text-2xl">
              Total: {total}$
            </p>
            <button
              onClick={handleCheckOut2}
              className="bg-[#40884a] w-full select-none text-white font-bold p-2 rounded-sm hover:opacity-80"
            >
              Check out
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;
