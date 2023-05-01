import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  numOfItem,
  increment,
  decrement,
  setToDef,
} from "../../redux/Features/numberOfItems";
import {addToCart,updateNumber} from '../../redux/Features/cartSlice'
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../components/loading page/LoadingPage";
import { useParams } from "react-router-dom";
import { u,sf } from "../../redux/Features/usersSlice";
import axios from "axios";
import "./product-style.css";
import useFetch from "../../Hooks/useFetch";
import { useEffect } from "react";


function Product() {
  let { id } = useParams();
  const [iIndex, setIIndex] = useState(1);
  const [defMsg, setDefMsg] = useState(-1);
  const [size, setSize] = useState();
  const [liked, setLiked] = useState(false);
  const user = useSelector(u);
  const [num,setNum]=useState(1)
  const dispatch = useDispatch();
  const { data, load } = useFetch(`http://localhost:3000/products/${id}`);

  const isLiked=async ()=>{
    try {
      let likeFlag=await axios.get(`http://localhost:3000/likes/${user?.id}/${id}`)
      if(likeFlag.data){
        console.log(likeFlag)
        setLiked(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    isLiked()
  }, []);

  const handleNumOfItems = (mode)=>{
    if (mode==="add"){
      let inStockData=data?.inStock.filter((item)=>item.size===size)
      if(inStockData[0]?.pieces>num){
        setNum((prev)=>prev+1)
        let obj={
          "userId":user?.id || guest,
          "id":id,
          "size":size,
          "numOfItem":num+1
        }
        dispatch(updateNumber(obj))
      }
    }

    else if(mode==="minus"){
      if(num>0)
      {
        setNum((prev)=>prev-=1)
        let obj={
          "userId":user?._id || guest,
          "id":id,
          "size":size,
          "numOfItem":num-1
        }
        dispatch(updateNumber(obj))
      }
    }
  }

  const handleiIndex = () => {
    if (iIndex === 1) {
      setIIndex(2);
    } else {
      setIIndex(1);
    }
  };

//  let lf=useFetch(`http://localhost:3000/likes/${user?.id}/${id}`);
  //console.log(lf)

  
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      const likeObj = {
        userId: user?.id,
        prodId: data._id,
      };
      console.log(likeObj);
      axios.post("http://localhost:3000/likes", likeObj);
    } else if (liked) {
      axios.delete(`http://localhost:3000/likes/${user?.id}/${data._id}`);
      setLiked(false);
    }
  };

  const handleAddToCart = () => {


    const cartObj = {
      userId: user?.id,
      prodDetails: {
        id: id,
        numOfItem: num,
        size: size,
      }};


      dispatch(addToCart(cartObj))
    };

  if (load) return <LoadingPage />;

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 sm:grid-cols-1 px-[10%] py-[5%]">
      <div className="left flex">
        <div className="flex gap-3 container" onClick={handleiIndex}>
          <img
            src={iIndex === 1 ? data?.img2 : data?.img1}
            alt="no pic"
            className="hover:ring-2 w-[20%] h-[20%] object-cover cursor-pointer ring-black"
          />
          <img
            src={iIndex === 1 ? data?.img1 : data?.img2}
            alt="no pic"
            className=" object-cover"
          />
        </div>
      </div>
      <div className="right align-middle flex flex-col gap-10 px-[22%] p-[5%] container">
        <p className="text-2xl font-bold">{data?.name}</p>
        <p className="text-xl font-semibold text-[#707277] ">{data?.price}$</p>
        <div className="flex justify-between items-center">
          <p className="text-md  bg-black py-2 px-3 flex rounded-lg text-sm font-semibold text-[#fff] ">
            {data?.tag}
          </p>
          <select
            name=""
            id=""
            value={defMsg === -1 ? -1 : size}
            onChange={(e) => {
              setSize(e.target.value);
              setDefMsg(1);
              setNum(1)
              //dispatch(setToDef())
            }}
            className="h-[70%] cursor-pointer select-none"
          >
            <option value="-1" label="Select Size" hidden={true}>
              Select Size
            </option>
            {data?.inStock.map((item,i) => (
              <option
                key={i}
                value={item.size}
                className="cursor-pointer text-black"
              >
                {item.size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAddToCart()}
            className={`${
              defMsg === -1 && "opacity-[0.5] pointer-events-none"
            } ${
              num === 0 && " pointer-events-none opacity-[0.5]"
            } bg-[#40884a] select-none text-white font-bold p-2 w-[80%] rounded-sm hover:opacity-80`}
          >
            Add To Cart
          </button>
          {user ? (
            liked ? (
              <AiFillHeart
                className="heart text-[25px] text-red-700 ring-1 ring-black ring-offset-4 rounded-full cursor-pointer hover:opacity-75 "
                onClick={handleLike}
              />
            ) : (
              <AiOutlineHeart
                className="heart text-[25px] ring-1 ring-black ring-offset-4 rounded-full cursor-pointer hover:opacity-75 "
                onClick={handleLike}
              />
            )
          ) : (
            <div className="tooltip-like">
            <AiOutlineHeart className="heart ring-offset-4 pointer-events-none text-[25px] opacity-60 ring-1 ring-black rounded-full cursor-pointer" />
            <div className="tooltip absolute text-sm rounded-md top-[66%] z-10 w-[10%] flex-wrap bg-slate-500 px-2 py-1 text-white left-[75%]">signin to like</div>
            </div>
          )}
        </div>
        <div className="number-of-products flex justify-center items-center">
          <div
            onClick={()=>handleNumOfItems("add")}
            className={` px-2 select-none cursor-pointer text-white flex items-center text-2xl font-bold bg-black  rounded-full `}
          >
            +
          </div>
          <div className="px-2 select-none">
            {defMsg === -1 ? "Select size" : num}
          </div>
          <div
            onClick={()=>handleNumOfItems("minus")}
            className={`${
              num === 0 ? "opacity-[0.7]" : ""
            } px-3 select-none cursor-pointer text-white flex items-center text-2xl font-bold bg-black  rounded-full p`}
          >
            -
          </div>
        </div>
        <p className="text-xs text-[#707277] ">
          <span className="font-bold">description: </span>
          {data?.desc}
        </p>
      </div>
    </div>
  );
}

export default Product;
