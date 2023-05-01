import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/cards/Card'
import useFetch from '../../Hooks/useFetch'
import LoadingPage from '../../components/loading page/LoadingPage'
//import data from '../../data.json'

const Categories = () => {
  let {categ}=useParams()
  const {data,load}=useFetch("https://mern-ecommerce-app-42rq.onrender.com/products")
  
  if(load)
  {
    return <LoadingPage/>
  }
  return (
    <div className='grid p-5 xl:grid-col-4 md:grid-cols-3  sm:grid-cols-2 xs:grid-col-1'>
      {data?.map((item)=> {
        if(item.label===categ)
        {
          return <Card item={item}/>
        }
        })
      }
    </div>
  )
}

export default Categories