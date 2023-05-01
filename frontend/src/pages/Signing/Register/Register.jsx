import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillEye } from "react-icons/ai";
import Axios from "axios";

const Register = ({ setSignUp }) => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [unMatched, setUnMatched] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = {
      username: name,
      email: email,
      password: password,
      //"phone": null,
      //"address":null,
    };

    if (password != password2) {
      setUnMatched(true);
    }
    else{
    try {
      const res = await Axios.post(
        "http://localhost:3000/users/register",
        newUser
      );
      if(res){
          navigate("/signedupsucc");
      }
    } catch (err) {
        setDuplicate(true)
    }}
  };

  return (
    <div className="bg-black flex justify-center h-[100vh] items-center">
      <div className="signup-container w-[40%] h-[100vh] items-center justify-center flex px-7 bg-white">
        <div className="flex container flex-col">
          <div className="flex text-center justify-center text-2xl font-bold">
            Ecommerce
          </div>
          <form className="flex container flex-col gap-3">
            <div className="name flex flex-col gap-1">
              <label htmlFor="username" className=" pl-1">
                Enter Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setDuplicate(false);
                }}
                name="username"
                placeholder="Name"
                className="p-2 border-solid border-[2px] border-black rounded-md"
                id="input3"
              />
            </div>
            <div className="email flex flex-col gap-1">
              <label htmlFor="email" className=" pl-1">
                Enter Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDuplicate(false);
                }}
                type="email"
                name="email"
                placeholder="example@example.com"
                className="p-2 border-solid border-[2px] border-black rounded-md"
                id="input1"
              />
            </div>
            <div className="password flex flex-col gap-1 relative">
              <label htmlFor="password" className=" pl-1">
                Password
              </label>
              <input
                required={true}
                onChange={(e) => {
                  {
                    setPassword(e.target.value);
                    setDuplicate(false);
                    setUnMatched(false);
                  }
                }}
                type={showPass ? "text" : "password"}
                name="password"
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
            <div className="password flex flex-col gap-1 relative">
              <label htmlFor="password2" className=" pl-1">
                Confirm Password
              </label>
              <input
                required={true}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  setDuplicate(false);
                  setUnMatched(false);
                }}
                type={showPass ? "text" : "password"}
                name="password2"
                placeholder="Re-enter Password"
                className="p-2 border-solid border-[2px] border-black rounded-md"
                id="password2"
              />
              <AiFillEye
                onClick={() => setShowPass((prev) => !prev)}
                className={`absolute ${
                  showPass ? "text-gray-700" : "text-gray-300"
                } text-2xl top-[53%] cursor-pointer left-[90%]`}
              />
            </div>
            {duplicate && (
              <p className="text-red-600 text-xs font-bold">
                There's already user with this username or email try another data
              </p>
            )}
            {unMatched && (
              <p className="text-red-600 text-xs font-bold">
                check re entered password
              </p>
            )}
            <div className="login flex justify-end p-1">
              <button
                onClick={(e) => handleSignUp(e)}
                className="bg-black text-white flex px-5 py-2 rounded-md hover:opacity-[0.7]"
              >
                Signup
              </button>
            </div>
            <div className="signup flex justify-center px-1 pb-2">
              <div className=" flex flex-col gap-2 w-full">
                <span className="text-sm font-bold">
                  already have an account?{" "}
                  <span
                    onClick={() => setSignUp(1)}
                    className=" text-blue-800 font-light cursor-pointer capitalize select-none hover:underline hover:opacity-[0.8] active:text-red-700"
                  >
                    login
                  </span>
                </span>
              </div>
            </div>
          </form>
          <Link to="/" className="py-2 w-[30%]">
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

export default Register;
