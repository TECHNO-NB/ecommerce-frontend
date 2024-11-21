import React from "react";
import modelGirlCover from "../assets/ecommerce pic.png";
import { FaArrowRightLong } from "react-icons/fa6";

const LandingPageComp: React.FC = () => {
  return (
    <div className="w-[100%] bg-[#E0E6EC]  lg:h-[90vh]  flex flex-col md:flex-row ">
      <div className=" left w-[100%] mt-4 md:mt-0 md:w-[60%] text-center  flex  md:justify-start h-[50%] lg:h-[100%]">
        <div className="flex flex-col items-start justify-center md:justify-start md:mt-20">
          <div className="text-6xl  lg:text-9xl">
            <h1 className="font-bold">World No. 1</h1>
            <h1 className="font-bold  lg:mr-10">Ecommerce </h1>
          </div>

          <h1 className="text-[#0086FF] font-extrabold text-7xl lg:text-9xl">
            Scatch
          </h1>
          <h1 className="font-bold text-[25px]  md:text-3xl ">
            Welcome to <span className="text-[#0086FF]">E-commerce</span>
          </h1>
          <button className="mt-4 bg-[#0086FF] flex justify-center items-center gap-2 text-center w-60 h-10 rounded-2xl font-bold text-xl text-white hover:bg-red-600">
            Shop now{<FaArrowRightLong className="mt-1" />}
          </button>
        </div>
      </div>
      <div className="right w-[100%] md:w-[40%] h-[50%] lg:w-[50%] lg:h-[80vh]  ">
        <img
          className=" filter drop-shadow-blue-600 h-[100%] w-[100%] mt-14 "
          src={modelGirlCover}
          style={{ filter: "drop-shadow(0 20px 20px #0086FF" }}
          alt="cover"
        />
      </div>
    </div>
  );
};

export default LandingPageComp;
