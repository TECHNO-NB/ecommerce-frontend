import React from "react";
import { IoCartOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  // @ts-ignores
  const navigateUser = async(link: string): any => {
    navigate(link);
    if (link === "/login") {
      axios.defaults.withCredentials=true;
     const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`)
     console.log(res)
      toast.success("Logout SuccessFully");
      localStorage.removeItem("persist:root");
    }
  }

  return (
    <nav className="border-b-[0.1em] select-none sticky top-0 z-10 bg-white border-black h-[10vh] w-[100vw] flex justify-between items-center px-4 sm:px-16">
      <div
        onClick={() => navigateUser("/admin")}
        className="logo cursor-pointer"
      >
        <h1 className="text-black text-3xl  font-bold">Admin.</h1>
      </div>
      <ul className="flex  text-black space-x-4 gap-1 text-[18px] sm-gap-4">
        <li
          onClick={() => navigateUser("/uploadproducts")}
          className="cursor-pointer"
        >
          <IoIosAddCircleOutline className="text-2xl" />
        </li>
        <li onClick={() => navigateUser("/search")} className="cursor-pointer">
          <IoIosSearch className="text-2xl font-extrabold" />
        </li>
        <li
          onClick={() => navigateUser("")}
          className="relative cursor-pointer"
        >
          <IoCartOutline className="text-2xl" />
          <p className="absolute top-[-0.9em]  text-red-800 left-2 ">0</p>
        </li>
        <li onClick={() => navigateUser("/login")} className="cursor-pointer">
          <MdLogout className="text-2xl" />
        </li>
      </ul>
    </nav>
  )
};

export default AdminNavbar;
