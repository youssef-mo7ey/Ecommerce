import React from 'react'
import './loading-page-style.css'

const LoadingPage = () => {
  return (
    <div>
        <div className="h-[400px] bg-white relative">
            <div id="buffer" className='absolute border-8 border-black rounded-full border-l-transparent w-[100px] h-[100px] top-[40%] left-[48%]'></div>
        </div>
    </div>
  )
}

export default LoadingPage