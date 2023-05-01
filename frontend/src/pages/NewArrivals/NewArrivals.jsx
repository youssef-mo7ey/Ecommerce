import React from 'react'
import data from '../../data.json'
import Card from '../../components/cards/Card'
const NewArrivals = () => {
  return (
    <div className='grid p-5 xl:grid-col-4 md:grid-cols-3  sm:grid-cols-2 xs:grid-col-1'>
        {data.map((item)=> {
            if(item.tag==="New")
            {
                return <Card item={item}/>
            }
            })
        }
    </div>
  )
}

export default NewArrivals