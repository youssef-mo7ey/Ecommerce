import React from 'react'
import { useSelector } from 'react-redux'
import { u } from '../../redux/Features/usersSlice'
import Card from '../../components/cards/Card'
import useFetch from '../../Hooks/useFetch'
import LoadingPage from '../../components/loading page/LoadingPage'
import { Link } from 'react-router-dom'
import {AiOutlineArrowLeft } from "react-icons/ai"

const Likes = () => {

    let user = useSelector(u)
    const {data,load}=useFetch(`https://mern-ecommerce-app-42rq.onrender.com/likes/${user.id}`)


    return (
        <>

        <h2 className='px-5 py-3 text-2xl font-bold'>Likes</h2>
        {load&&<LoadingPage/>}
        <div className="select-none pt-[5%] grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 ">
        {
            data?.map((item)=>{
                return(
                    <Card key={Math.random()} item={item}/>
                    )
                })
            }
        </div>
        {(!data)&& <p className='flex flex-col items-center justify-between text-3xl font-bold p-10'> Please Like Some Items And Come Back {":)"} <span className='text-blue-700 text-lg font-normal hover:opacity-[0.7]  active:text-red-700'><Link to="/" className='flex items-center'><AiOutlineArrowLeft className='mr-2'/> back to home</Link></span></p>}
        
        </>
)
}

export default Likes