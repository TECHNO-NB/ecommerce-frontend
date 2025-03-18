import React from "react";
import FeaturesCard from "./FeaturesCard";
import "../index.css"

const FeaturedProducts: React.FC = () => {
  return (
    <div className="mt-10 pb-4 text-center">
      <h1 className="text-3xl  text-[#1A0B5B] font-bold">Featured Products</h1>
      <div className="features mt-6">
        {new Array(3).fill(0).map(() => {
          return <FeaturesCard />;
        })}
      </div>
      <div className="color flex gap-2 mt-14 justify-center">
        <div className="active bg-[#FB2E86] w-8 h-2  rounded-md"></div>
        <div className="color bg-[#FEBAD7] w-8 h-2  rounded-md"></div>
        <div className="color bg-[#FEBAD7] w-8 h-2  rounded-md"></div>
        <div className="color bg-[#FEBAD7] w-8 h-2  rounded-md"></div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
