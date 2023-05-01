import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Product from './pages/product/Product';
import Signing from './pages/Signing/Signing';
import Account from './pages/Account/Account';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Checkout from './pages/Checkout/Checkout';
import Categories from './pages/Categories/Categories';
import Likes from './pages/Likes/Likes';
import NewArrivals from './pages/NewArrivals/NewArrivals';
import SignedUpSucc from './pages/SignedUpSucc/SignedUpSucc';
import Test from './pages/Test/Test';
import LoadingPage from './components/loading page/LoadingPage';
import DeliveryOnTheWay from './pages/DeliveryOnTheWay/DeliveryOnTheWay';
const Layout=()=>{
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const router= createBrowserRouter([
  { 
    path:"/",
    element:<Layout/>,
    children:
    [
      {
        path:"/",
        element:<Home/>
      },
      { 
        path:"categories/:categ",
        element:<Categories/>
      },
      { 
        path:"products",
        element:<Products/>
      },
      { 
        path:"product/:id",
        element:<Product/>
      },
      { 
        path:"account/:username",
        element:<Account/>
      },
      { 
        path:"checkout",
        element:<Checkout/>
      },
      { 
        path:"likes",
        element:<Likes/>
      },
      { 
        path:"newarrivals",
        element:<NewArrivals/>
      },
      { 
        path:"*",
        element:<NotFound/>
      }
    ],

  },
  { 
    path:"signin",
    element:<Signing/>
  },
  { 
    path:"deliveryontheway",
    element:<DeliveryOnTheWay/>
  },
  { 
    path:"signedupsucc",
    element:<SignedUpSucc/>
  },
  { 
    path:"test",
    element:<Test/>
  },

])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;