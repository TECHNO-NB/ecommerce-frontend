import React from "react";

const SortingComp: React.FC = () => {
  return (
    <div className="flex gap-2 text-xl lg:fixed  top-[90vh] bg-white lg:w-0">
      <h1 className="font-bold">sortBy:</h1>
      <select className="border-2 bg-[#0086FF] text-white border-black cursor-pointer">
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="discount">Dicount</option>
      </select>
    </div>
  );
};

export default SortingComp;
