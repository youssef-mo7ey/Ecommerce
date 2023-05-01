//reactImports
import React, { useEffect, useState } from "react";
//icons
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
//Components
import Card from "../../components/cards/Card";
import LoadingPage from "../../components/loading page/LoadingPage";
import GridView from "../../components/GridView/GridView";
//assets
import image1 from "../../../assets/slider images/blog_01.jpg";
import image2 from "../../../assets/slider images/blog_02.jpg";
import image3 from "../../../assets/slider images/blog_03.jpg";
//css
import "./home.css";
//custom Hook
import useFetch from "../../Hooks/useFetch";
import { getCart } from "../../redux/Features/cartSlice";
import { u } from "../../redux/Features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  let sliderArray;
  sliderArray = [image1, image2, image3];
  const [slide, setSlide] = useState(0);

  const {data,load,err} = useFetch("http://localhost:3000/products");
  const newCols=data?.slice(0,3)
  const user=useSelector(u)
  const dispatch=useDispatch()
  
  
  useEffect(()=>{

    dispatch(getCart(user?.id))
  },[])
  

  const handleClickLeft = () => {
    if (slide === 2) {
      setSlide(0);
      clearInterval(interval);
    } else {
      setSlide((prevSlide) => prevSlide + 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (slide >= 2) {
        setSlide(0);
        clearInterval(interval);
      } else {
        setSlide((prevSlide) => prevSlide + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [slide,dispatch]);
  const handleClickRight = () => {
    if (slide === 0) {
      setSlide(2);
    } else {
      setSlide((prevSlide) => prevSlide - 1);
    }
  };

  if (load) return <LoadingPage />;

  return (
    <>
      <div className="slider-container w-[100%] h-[500px]  relative">
        <div
          className={`slider w-full h-[100%] object-cover overflow-hidden transition-all duration-200 ease-linear`}
        >
          <img
            src={sliderArray[slide]}
            className=" w-full h-full object-cover bg-[#cfd3d6] "
            alt=""
          />
        </div>
        <div className="arrows top-[70%] ml-[46%] absolute flex">
          <div
            onClick={handleClickRight}
            className="right-arrow cursor-pointer select-none mr-5 ring-1 ring-black  "
          >
            <AiOutlineArrowLeft className="text-[30px] cursor-pointer " />
          </div>
          <div
            onClick={handleClickLeft}
            className="left-arrow cursor-pointer select-none ring-1 ring-black"
          >
            <AiOutlineArrowRight className="text-[30px] cursor-pointer " />
          </div>
        </div>
      </div>

      <h3 className="text-center my-10 text-xl font-bold text-[#222] select-none">
        New Collections
      </h3>
      <div className=" grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 px-10">
        {newCols?.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
      </div>

      <div className="container hidden md:block">
        <h3 className="text-center mt-10 text-xl font-bold text-[#222] select-none">
          Collections
        </h3>
        <GridView />
      </div>
    </>
  );
}

export default Home;
