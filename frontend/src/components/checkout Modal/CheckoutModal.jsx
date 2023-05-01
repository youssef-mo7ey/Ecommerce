import React from 'react'
import { u,updatePhoneOrAddress } from '../../redux/Features/usersSlice'
import{GrClose} from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { resetCart } from '../../redux/Features/cartSlice'
import axios from 'axios'

const CheckoutModal = ({setModal}) => {
    const user =useSelector(u)
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [phone,setPhone]=useState()
    const [address,setAddress]=useState()
    const handlePhone =(e)=>{
        setPhone(e.target.value)
    }
    const handleAddress =(e)=>{
        setAddress(e.target.value)
    }
    const handleSubmit =async ()=>{
        if(user){
            const addPhone = await axios.patch(
                "https://mern-ecommerce-app-42rq.onrender.com/users/phone/" + user.id,
                { phone: phone }
              );
            const addAddress = await axios.patch(
                "https://mern-ecommerce-app-42rq.onrender.com/users/address/" + user.id,
                { address: address }
              );
            dispatch(updatePhoneOrAddress({address:address,phone:phone}))
            let clear=await axios.delete(`https://mern-ecommerce-app-42rq.onrender.com/cart/${user.id}`)

        }
        if(!user){
            let guest =JSON.parse(localStorage.getItem("guest"))
            let guestId=guest.userId
            let obj={
                userId:guest.userId,
                phone:phone,
                address:address}
            localStorage.setItem("guest",JSON.stringify(obj))    
            let clear=await axios.delete(`https://mern-ecommerce-app-42rq.onrender.com/cart/${guestId}`)
        }
        dispatch(resetCart())
        localStorage.removeItem("guest")
        setModal(false)
        navigate("/deliveryontheway")
    }
    return (
    <div className=' select-none'>
        <div onClick={()=>setModal(false)} className='bg-gray-700 opacity-[0.35] w-full h-full fixed top-0  '>
        </div>
        <div className='bg-white rounded-md z-30 gap-2 flex flex-col fixed w-[40%] h-[55%] top-[20%] left-[30%]'>
            <span onClick={()=>setModal(false)} className='flex justify-end px-4 py-2 font-bold text-2xl cursor-pointer hover:opacity-80 active:50'><GrClose/></span>
            <h1 className='text-black text-3xl font-bold flex justify-center'>
                ECommerce
            </h1>
            <div className='flex flex-col gap-2 px-[20%]'>
                <label className='font-bold' htmlFor="phone">Phone</label>
                <input onChange={(e)=>handlePhone(e)} placeholder='Enter phone' name='phone' type="text" className='ring-2 py-[3px] px-1 ring-black outline-none rounded-sm'/>
                <label className='font-bold' htmlFor="Address">Address</label>
                <input onChange={(e)=>handleAddress(e)} placeholder='Enter Address' name='Address' type="text" className='ring-2 py-[3px] px-1 ring-black outline-none rounded-sm'/>
            <div className='flex justify-between'>
                <button 
                onClick={handleSubmit}
                className='bg-[#40884a] rounded-md text-white w-[30%] px-2 py-1 mt-2 hover:opacity-70 active:opacity-50'>
                    submit
                </button>
                {!user&&<button onClick={()=>{navigate("/signin")}} className='bg-black rounded-md text-white w-[30%] px-2 py-1 mt-2 hover:opacity-70 active:opacity-50'>
                    Login
                </button>}
            </div>
            </div>
        </div>

    </div>
  )
}

export default CheckoutModal