import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillEye } from "react-icons/ai";
import { logInHandler,reset} from "../../../redux/Features/usersSlice";
import { u ,e,sf} from "../../../redux/Features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios'

const SignIn = ({ setSignUp }) => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState(false);

  const user =useSelector(u)
  const err =useSelector(e)
  const signedFlag =useSelector(sf)

  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(err)
    {
      setShowErr(true)

    }
    if(user && signedFlag){
      console.log("here")
      navigate('/')
    }
  },[err,user,navigate])

  const handleClick = (e) => {
    e.preventDefault();
    const userData={
      email:email,
      password:password
    }
    dispatch(logInHandler(userData))
  };

  return (
    <div className="bg-black flex justify-center h-[100vh] items-center">
      <div className="login-container w-[40%] xs:w-[90%] h-[100vh] items-center justify-center flex px-7 bg-white">
        <div className="flex container flex-col">
          <div className="flex text-center justify-center text-2xl font-bold">
            Ecommerce
          </div>
          <form className="flex container flex-col gap-3">
            <div className="email flex flex-col gap-1">
              <label htmlFor="input1" className=" pl-1">
                Email
              </label>
              <input
                required={true}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowErr(false);
                }}
                type="email"
                name="input1"
                placeholder="example@example.com"
                className="p-2 border-solid border-[2px] border-black rounded-md"
                id="input1"
              />
            </div>
            <div className="password flex flex-col gap-1 relative">
              <label htmlFor="input2" className=" pl-1">
                Password
              </label>
              <input
                required={true}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowErr(false);

                }}
                type={showPass ? "text" : "password"}
                name="input2"
                placeholder="Enter Password"
                className="p-2 border-solid border-[2px] border-black rounded-md"
                id="input2"
              />
              <AiFillEye
                onClick={() => setShowPass((prev) => !prev)}
                className={`absolute ${
                  showPass ? "text-gray-700" : "text-gray-300"
                } text-2xl top-[53%] cursor-pointer left-[90%]`}
              />
            </div>
            {showErr && <div className="text-red-600 font-semibold">Email Or Password Is Invalid</div>}
            <div className="flex w-full justify-center">
              <button
                className="bg-black text-white flex w-[100%] justify-center px-5 py-2 rounded-md hover:opacity-[0.7]"
                onClick={(e) => handleClick(e)}
              >
                Login
              </button>
            </div>
            <div className="signup flex justify-center px-1 pb-2">
              <div className=" flex flex-col gap-2 w-full">
                <span className="text-sm font-bold">
                  dosen't have an account?
                </span>
                <div className="flex w-full justify-center">
                  <button
                    onClick={() => setSignUp(2)}
                    className="bg-black text-white flex w-[50%] justify-center px-5 py-2 rounded-md hover:opacity-[0.7]"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </form>
          <Link to="/" className="py-2">
            <span className="flex items-center gap-1 underline text-blue-800 capitalize hover:opacity-[0.7] active:text-red-600">
              {" "}
              <AiOutlineArrowLeft /> back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
