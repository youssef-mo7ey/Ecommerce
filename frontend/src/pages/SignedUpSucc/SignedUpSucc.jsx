import React from 'react'
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SignedUpSucc = () => {
  return (
    <div className='flex flex-col w-full'>
        <div className='absolute flex flex-col gap-5 left-[40%] top-[15%]'>
            <BsFillCheckCircleFill className=' text-[1400%] text-green-500 '/>
            <Link to='/signin' className='text-xl  underline text-blue-800 capitalize hover:opacity-[0.7] active:text-red-600'>
                Go Back To Sign In Page
            </Link>
        </div>

    </div>
  )
}

export default SignedUpSucc