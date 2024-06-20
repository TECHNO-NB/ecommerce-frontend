import React from "react";
import modelGirlCover from "../assets/model2.png";

const LandingPageComp: React.FC = () => {
  return (
    <div className=" w-[100vw] h-[] px-0  md:px-16 md:pr-16 md:h-[90vh] ">
      <div className="flex items-center gap-0 h-[30vh] bg-[#f3f367] md:gap-4 px-0 md:px-16 md:h-[85vh] ">
        {/* left */}
        <div className="w-[100%] h-[100%] md:w-[50%] ">
          <img
            src={modelGirlCover}
            alt="image"
            className="scale-x-[-1] w-[100%] h-[100%] pl-0 md:pl-0"
          />
        </div>

        {/* right */}
        <div className="w-[70%] flex flex-col items-start mr-5 md-[100%]">
          <h1 className="text-4xl hidden font-bold md:text-8xl md:block">
            World No. 1 <br/>E-commerce
            <span className="text-[#0086FF]"> Scatch</span>
          </h1>

          <h1 className="text-3xl  block font-bold md:text-8xl md:hidden">
            World No. 1 Ecommerce
            <span className="text-[#0086FF]"> Scatch</span>
          </h1>
          <h1 className="text-[12px] font-bold sm:text-2xl">
            Welcome to <span className="text-[#0086FF]">E-commerce</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComp;
