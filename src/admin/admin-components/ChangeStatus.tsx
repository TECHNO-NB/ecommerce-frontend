import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ChangeStatus: React.FC<any> = ({props}) => {
  
  return (
    <div className=" fixed w-full left-[0%] flex flex-col items-center  justify-center ">
      <div className="div  bg-white shadow-lg w-48 h-28 rounded-lg">
        <div className="div flex items-center justify-center border-b-2 border-black gap-4 mt-2">
          <h1 className="text-center font-bold text-xl  ">Change Status</h1>
          <AiFillCloseCircle onClick={()=> props(false)} className="text-red-600 text-2xl  cursor-pointer" />
        </div>
        <div className="btn flex flex-col gap-1 justify-center mt-2 px-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
          5 px-2 rounded"
          >
            Success
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
          5 px-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;
