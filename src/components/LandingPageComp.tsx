import React from "react";
import light from "../assets/lamp.png";
import chair from "../assets/chair.png";


const LandingPageComp: React.FC = () => {
  return (
    <section className="relative pt-24 z-0 w-full bg-[#F2F0FF] py-12 px-6 md:px-30 lg:px-32 flex flex-col md:flex-row items-center justify-between overflow-hidden">
    {/* Lamp Light */}
    <img
      src={light} // Replace with actual lamp image URL
      alt="Lamp Light"
      className="absolute top-10 left-0 md:left-[2%] w-24 md:w-24 lg:w-56"
    />
    <div className="circe absolute w-3 h-3 bottom-28 left-6 sm:left-16 bg-pink-500 rounded-full">

    </div>

    {/* Left Content */}
    <div className="md:w-1/2 text-center md:text-left md:space-y-4 md:mt-2  md:ml-20">
      <p className="text-sm text-pink-500 font-semibold">
        Best Clothese For Your Lifestyle...
      </p>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
        New Scatch Collection <br /> Trends in 2025
      </h1>
      <p className="text-gray-600 text-sm md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est
        adipiscing in phasellus non in justo.
      </p>
      <button className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition">
        Shop Now
      </button>
    </div>

    {/* Right Content */}
    <div className="img relative mt-8 md:mt-0 md:w-1/2 flex justify-center">
      {/* Chair Image */}
     
      <img
        src={chair}// Replace with actual chair image URL
        alt="Chair"
        className="w-60 md:w-80 lg:w-96"
      />
      {/* Discount Badge */}
      <div className="absolute top-0 right-0 left-[60%] z-50 bg-blue-500 text-white text-center text-xs md:text-sm font-bold px-3  py-2 rounded-full w-20">
        50% off
      </div>
    </div>

    {/* Bottom Navigation Dots */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
    </div>
  </section>
  );
};

export default LandingPageComp;
