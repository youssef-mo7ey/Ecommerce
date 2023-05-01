import React from 'react'
import { useEffect,useState } from 'react';
import supabase from '../../config/supabaseClient'

const Test = () => {
    const [err,setErr]=useState(null)
    const [load,setLoad]=useState(null)
    const [users,setUsers]=useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoad(true)
            const {data,error}=await supabase
            .from('Users').select()

        
            if (error){
                setErr(error);
                setLoad(false)
                setUsers(null)

            }
            if(data){
                setUsers(data)
                setLoad(false)
                setErr(null)
            }
        }
        fetchData()
    },[])

    
    console.log(users);

  return (
    <div>
        {load&&<>Loading...</>}
        {err&&<p>{err.message+"erorr"}</p>}
        {users&&
        <div>
            FOUND
            {users.map((item,index) => <div key={item.id}>
            <p className='text-5xl font-bold'>USER # {index}</p>
            <span>
                {item.Email}
            </span>
            <span>
                {item.password}
            </span>
            </div>)}
        </div>}
    </div> 
  )
}

export default Test