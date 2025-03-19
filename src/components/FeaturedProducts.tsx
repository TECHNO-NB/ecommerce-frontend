import React from "react";
import FeaturesCard from "./FeaturesCard";
import "../index.css";
import headphone from "../assets/purepng 1.png";
import watch from "../assets/digital watch.png";
import mobile from "../assets/mobile.png";

const FeaturedProducts: React.FC = () => {
  const data: any = [
    {
      title: "Head Phone v8",
      img: headphone,
    },
    {
      title: "Digital Watch",
      img: watch,
    },
    {
      title: "Redmi Note 10",
      img: mobile,
    },
  ];
  return (
    <div className="mt-10 pb-4 text-center">
      <h1 className="text-3xl  text-[#1A0B5B] font-bold">Featured Products</h1>
      <div className="features mt-6">
        { data.map((val:any) => (
           <FeaturesCard  val={val}/>
      ))}
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
