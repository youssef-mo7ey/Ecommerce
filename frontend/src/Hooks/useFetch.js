import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [load, setLoad] = useState(null);
  useEffect(()=>{
    const fetchData=async () => {
        setLoad(true);
        try {
          const res = await axios.get(url);
          const d=await res?.data
          setLoad(false);
          setData(d);
        } catch (error) {
          setLoad(false);
          setErr(true);
        }
    
    }
    fetchData()
  }, [url]);
return { data, err, load };
};

export default useFetch;
