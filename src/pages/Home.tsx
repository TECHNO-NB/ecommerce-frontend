import React, { useEffect, useId, useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../components/Card";
import LandingPageComp from "../components/LandingPageComp";
import axios from "axios";
import VideoLoader from "../components/VideoLoader";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import FeaturedProducts from "../components/FeaturedProducts";
import OfferCard from "../components/OfferCard";
import offerData from "../components/OfferData";
import sofa from "../assets/sofa.png";
import Footer from "../components/footer/Footer";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const id = useId();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="h-auto bg-[#fff]  select-none overflow-x-hidden  ">
      <Navbar />
      <div className=" bg-[#F2F0FF] overflow-x-hidden">
        <LandingPageComp />
      </div>
      <div className="Featured Products bg-[#fff] w-full flex justify-center mx-auto px-2  md:px-16 lg:px-20">
        <FeaturedProducts />
      </div>
      <div className="flex justify-between bg-[#fff] items-center text-center  px-2 md:px-16 lg:px-20  border-black pt-5">
        <h1 className="text-center flex items-center justify-center w-full mt-2 font-bold pl-2 text-3xl text-[#1A0B5B]">
          Products
        </h1>
      </div>
      {isLoading ? (
        <VideoLoader />
      ) : (
        <div className="flex w-[100vw] bg-[#fff] px-20 mt-4 flex-col items-center lg:items-start sm:px-32 lg:flex-row">
          <div className="grid w-[97.8vw] gap-2 gap-x-2 grid-y-2 mt-2 gap-y-2 lg:gap-y-0 grid-cols-2 md-gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:w-[98vw]">
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

      <div className="scatch-offer bg-[#fff] mx-auto px-2 flex justify-center items-center flex-col md:px-16 lg:px-20 pb-4">
        <h1 className="text-center flex items-center justify-center w-full mt-6 font-bold pl-2 text-3xl text-[#1A0B5B]">
          What Scatch Offer!
        </h1>
        <div className="Offer-card mt-6 flex gap-4 flex-wrap items-center justify-center">
          {offerData && offerData.map((val: any) => <OfferCard data={val} />)}
        </div>
      </div>

      <div className="latest-products bg-[#F1F0FF] flex items-center justify-center mt-14 mx-auto px-2  md:px-16 lg:px-20 pb-4 sm:pb-0">
        <div className="flex items-center justify-center flex-wrap">
          <div className="left flex items-center justify-center ">
            <img src={sofa} height={490} width={500} />
          </div>
          <div className="right ">
            <h1 className="text-4xl font-bold text-[#1A0B5B]">
              Unique Features Of leatest &<br /> Trending Poducts
            </h1>
            <div className="mt-4">
              <div className="div flex gap-2 items-center">
                <div className="bg-red-600 rounded-[100%] w-4 h-4"></div>
                <p>All frames constructed with hardwood solids and laminates</p>
              </div>
              <div className="div flex gap-2 items-center">
                <div className="bg-blue-600 rounded-[100%] w-4 h-4"></div>
                <p>
                  Reinforced with double wood dowels, glue, screw - nails corner
                  <br />
                  blocks and machine nails
                </p>
              </div>
              <div className="div flex gap-2 items-center">
                <div className="bg-green-600 rounded-[100%] w-4 h-4"></div>
                <p>Arms, backs and seats are structurally reinforced</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="mt-6 bg-pink-500 text-white px-6 py-2  shadow-lg hover:bg-pink-600 transition">
                Add To Cart
              </button>
              <p className="mt-4 text-[#1A0B5B]">
                B&B Italian Sofa
                <br />
                $32.00
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
