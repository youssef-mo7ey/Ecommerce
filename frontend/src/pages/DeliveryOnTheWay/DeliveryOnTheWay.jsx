import React from 'react'
import {Link} from "react-router-dom"
import {BsFillCheckCircleFill} from "react-icons/bs"
import {MdDeliveryDining} from "react-icons/md"
import "./delivery-styles.css"

const DeliveryOnTheWay = () => {
  return (
    <div className='relative flex flex-col main '>
        <div className='mt-10 mx-auto flex flex-col'>
            <BsFillCheckCircleFill className=' text-[1400%] text-green-600 text-black '/>
            <Link to='/' className='text-xl my-7 ml-1 underline text-blue-800 capitalize hover:opacity-[0.7] active:text-red-600'>
                Go Back To Home Page
            </Link>
        </div>
        <div className="surface ">
        </div>
        <div className='car -bottom-[40%] left-[15%] absolute animate-bounce'>
            <MdDeliveryDining className='text-[100px] text-gray-800 z-20'/>
        </div>

    </div>
  )
}

export default DeliveryOnTheWay