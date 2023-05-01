import React from "react";
import { useState } from "react";
import Card from "../../components/cards/Card";
import useFetch from "../../Hooks/useFetch";
import LoadingPage from "../../components/loading page/LoadingPage";
import "./products.css";

function Products() {
  const { data, load, err } = useFetch("http://localhost:3000/products");

  let [rangeVal, setRangeVal] = useState(100);

  if (load) return <LoadingPage />;

  return (
    <div className="flex h-[100%] min-h-[100vh] md:flex-row xs:flex-col">
      <div className="selection-form p-7 px-9 top-0 md:max-w-[37vw] xs:w-full  bg-black text-white ">
        <div className=" max-w-[160px]">
          <label htmlFor="range" className="text-white pb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <p>0</p>
            <input
              type="range"
              id="range"
              name="range"
              min={0}
              max={100}
              step={1}
              onChange={(e) => setRangeVal(e.target.value)}
              className="text-white"
            />
            <p>{rangeVal}</p>
          </div>
        </div>
      </div>

      <div className="select-none pt-[5%] grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 ">
        {data?.map((item) => {
          if (item.price <= rangeVal) {
            return <Card key={item._id} item={item} />;
          }
        })}
      </div>
    </div>
  );
}

export default Products;
