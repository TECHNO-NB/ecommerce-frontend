import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../components/Card";
import LandingPageComp from "../components/LandingPageComp";
import axios from "axios";
import VideoLoader from "../components/VideoLoader";
import { useNavigate } from "react-router-dom";
import ModalBox from "../components/ModalBox"


const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    try {
      (async () => {
        setIsloading(true);
        const res = await axios.get("https://ecommerce-backend-r13r.onrender.com/api/v1/product/getallproducts");
        setIsloading(false);
        setProducts(res.data.data);
      })();
    } catch (error) {
     console.log(error)
      navigate("/login")
      setIsloading(false);
     
      
    }
  }, []);

  return (
    <div className="h-auto select-none  sm:bg-white">
      <Navbar />
      <div className="">
        <LandingPageComp />
      </div>
             <ModalBox/> 
      <h1 className="text-3xl mt-2 font-bold pl-2 md:pl-16 md:text-5xl text-[#0086FF]">
        Products:
      </h1>
      {isLoading ? (
        <VideoLoader />
      ) : (
        <div className="flex  w-[100vw] px-20 flex-col items-center lg:items-start sm:px-16 lg:flex-row">
          <div className="grid  w-[97.8vw] gap-4 gap-x-2  grid-y-2 mt-2  gap-y-2 lg:gap-y-0 grid-cols-2 md-gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:w-[98vw] ">
            {products.map((v) => (
              <Card key={v} data={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
