import React, { useEffect, useId, useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../components/Card";
import LandingPageComp from "../components/LandingPageComp";
import axios from "axios";
import VideoLoader from "../components/VideoLoader";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const id = useId();

  useEffect(() => {
    try {
      (async () => {
        setIsloading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getallproducts`
        );
        setIsloading(false);
        setProducts(res.data.data);
       
      })();
    } catch (error) {
      console.log(error);
      navigate("/login");
      setIsloading(false);
    }
  }, []);

  return (
    <div className="h-auto bg-[#E0E6EC]  select-none  ">
      <Navbar />
      <div className="px-2 md:px-16 lg:px-20">
        <LandingPageComp />
      </div>

      <div className="flex justify-between items-center px-2 md:px-16 lg:px-20 border-t-4 border-black pt-5">
        <h1 className="text-3xl mt-2 font-bold pl-2  md:text-5xl text-[#0086FF]">
          Products:
        </h1>
        <h1
          onClick={() => navigate("/search")}
          className="mr-16 text-xl cursor-pointer font-bold text-[#0086FF]"
        >
          More:
        </h1>
      </div>
      {isLoading ? (
        <VideoLoader />
      ) : (
        <div className="flex w-[100vw] px-20 flex-col items-center lg:items-start sm:px-16 lg:flex-row">
          <div className="grid w-[97.8vw] gap-4 gap-x-2 grid-y-2 mt-2 gap-y-2 lg:gap-y-0 grid-cols-2 md-gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:w-[98vw]">
            {products.map((v) => (
              <>
              <Card key={id} data={v} />
              <Card key={id} data={v} />
              </>
            ))}
          </div>
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
