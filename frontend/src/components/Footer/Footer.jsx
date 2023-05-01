import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <>
        <div className='footer  '>
            <div className='left-side flex gap-[10%]  select-none p-[5%]  '>

            <div className='left-2 '>
                <h2 className='text-md font-bold py-2 text-[#333]'>Categories</h2>
                <div className="categories flex flex-col">
                    <span className='text-xs font-semibold py-1 text-[#555]'><Link to='categories/Jackets'> Jackets </Link></span>
                    <span className='text-xs font-semibold py-1 text-[#555]'><Link to='categories/Tops'> Tops </Link></span>
                    <span className='text-xs font-semibold py-1 text-[#555]'><Link to='categories/Shoes'> Shoes </Link></span>
                    <span className='text-xs font-semibold py-1 text-[#555]'><Link to='categories/Acces'> Accessories </Link></span>
                    <span className='text-xs font-semibold py-1 text-[#555]'><Link to='newarrivals'> New Arrivals </Link></span>
                </div>
            </div>
            <div className="left-2  ">
                <h2 className='text-md font-bold py-2 text-[#333]'>Links</h2>
                <div className="categories flex flex-col">
                    <span className='text-xs font-semibold py-1 text-[#555]'>FAQ</span>
                    <span className='text-xs font-semibold py-1 text-[#555]'>Pages</span>
                    <span className='text-xs font-semibold py-1 text-[#555]'>Stores</span>
                    <span className='text-xs font-semibold py-1 text-[#555]'>Compare</span>
                    <span className='text-xs font-semibold py-1 text-[#555]'>Cookies</span>
                </div>
            </div>
            </div>

            <div className='right-side flex gap-[10%] select-none p-[5%]'>

            <div className="right-2  ">
                <h2 className='text-md font-bold py-2 text-[#333]'>About</h2>
                <div className="categories">
                    <span className='text-xs font-semibold text-[#555]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur laudantium beatae.
                    </span>
                </div>
            </div>
            <div className="right-2  ">
            <h2 className='text-md font-bold py-2 text-[#333] w-[50px] '>Contact</h2>
                <div className="categories">
                    <span className='text-xs font-semibold py-1 text-[#555]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur laudantium.
                    </span>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Footer