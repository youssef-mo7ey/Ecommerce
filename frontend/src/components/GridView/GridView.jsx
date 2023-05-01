import React from 'react'
import { Link } from 'react-router-dom'
import './grid-view.css'
import image1 from '../../../assets/grid/pic1.jpg'
import image2 from '../../../assets/grid/pic2.jpg'
import image3 from '../../../assets/grid/pic3.jpg'
import image4 from '../../../assets/grid/pic4.jpg'
import image5 from '../../../assets/grid/pic5.jpg'
const GridView = () => {


return (
    <div id="categ" className='px-[1%] py-[3%] flex flex-1' >
        <div className="grid grid-flow-col gap-2 h-[500px] overflow-clip ">
            <div className="first-col grid grid-flow-row gap-2">
                <div className="image1  relative">
                    <Link to="/categories/Shoes" className='absolute bg-black px-5 py-2 text-white rounded-md top-[20%] left-[40%] z-20'>Shoes</Link>
                    <Link to="/categories/Shoes"><div className='absolute bg-gray-500 cursor-pointer w-full h-[50%] top-0 z-10 opacity-0 hover:opacity-40'></div></Link>
                    <div className="container h-[50%] overflow-clip">
                        <img src={image1} alt="" className=' object-cover w-full -translate-y-[40%]' />
                    </div>
                    
                </div>
                <div className="image2  relative -translate-y-[50%] ">
                    <Link to="/categories/Jackets" className='absolute bg-black px-5 py-2 text-white rounded-md top-[20%] left-[40%] z-20'>Jackets</Link>
                    <Link to="/categories/Jackets"><div className='absolute bg-gray-500 cursor-pointer w-full h-[50%] top-0 z-10 opacity-0 hover:opacity-40'></div></Link>
                    <div className="container h-[50%] overflow-clip">
                        <img src={image2} alt="" className=' object-cover w-full -translate-y-[5%]' />
                    </div>
                </div>
            </div>
            <div className="second-col">
                <div className="image3 relative h-full ">
                    <Link to="/categories/Tops" className='absolute bg-black px-5 py-2 text-white rounded-md top-[20%] left-[40%] z-20'>Tops</Link>
                    <Link to="/categories/Tops"><div className='absolute bg-gray-500 cursor-pointer w-full h-[50%] top-0 z-10 opacity-0 hover:opacity-40'></div></Link>
                    <img src={image4} alt="" className=' object-cover w-full h-[50%]' />
                </div>
            </div>
            <div className="third-col grid grid-flow-row gap-2 ">
                <div className="image4 relative">
                    <Link to="/categories/Acces" className='absolute bg-black px-5 py-2 text-white rounded-md top-[20%] left-[35%] z-20'>Accessories</Link>
                    <Link to="/categories/Acces"><div className='absolute bg-gray-500 cursor-pointer w-full h-[50%] top-0 z-10 opacity-0 hover:opacity-40'></div></Link>
                    <div className="box-border container h-[50%] overflow-hidden">    
                        <img src={image3} alt="" className=' object-cover -translate-y-[35%] w-full' />
                    </div>

                </div>
                <div className="image5  relative -translate-y-[50%]">
                    <Link to="/categories/Pants" className='absolute bg-black px-5 py-2 text-white rounded-md top-[20%] left-[35%] z-20'>Trousers</Link>
                    <Link to="/categories/Pants"><div className='absolute bg-gray-500 cursor-pointer w-full h-[50%] top-0 z-10 opacity-0 hover:opacity-40'></div></Link>
                    <div className="box-border container h-[50%] overflow-hidden">    
                        <img src={image5} alt="" className=' object-cover -translate-y-[15%] w-full' />
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default GridView