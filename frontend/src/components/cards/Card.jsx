import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({item}) => {
    return (
    <div className="new-collections flex justify-center w-[100%] px-[100px]">
        <div className='flex items-center flex-col'>
            <Link to={`/product/${item?._id}`}>
                <div  className="flex justify-center relative select-none min-w-[5rem] min-h-[8rem] border-black border-solid hover:border-[2px] ">
                    {item?.tag&&<div className="flex absolute left-[10%] top-[5%]  text-white px-[5px] py-[4px] tracking-wider z-40 text-[7px] bg-black border-none">{item.tag}</div>}
                    <img src={item?.img1} alt="No Pic" className=' z-20 h-full absolute cursor-pointer hover:z-0' />
                    <img src={item?.img2} alt="No Pic" className=' z-10 cursor-pointer hover:z-30' />
                </div>
                <div className="flex justify-between px-2 my-5">
                <p className='cursor-pointer select-none'> {item.name} </p>
                <p className='cursor-pointer select-none'> {item.price}$</p>
                </div>
            </Link>
        </div>
    </div>
)
}

export default Card
