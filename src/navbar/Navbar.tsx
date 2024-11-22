import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MdLogout } from "react-icons/md";
import { openModal } from "../redux/ModalSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.product);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigateUser = (link: string): void => {
    navigate(link);
    if (link === "/login") {
      dispatch(openModal(true));
    }
  };

  return (
    <nav className="border-b-[0.1em] select-none sticky top-0 z-10 bg-[#0086FF] border-black text-white  h-[8vh] sm:h-[10vh] w-[100vw] flex justify-between items-center    px-2 md:px-16 lg:px-20">
      <div onClick={() => navigateUser("/")} className="logo cursor-pointer">
        <h1 className="text-black text-3xl  font-bold">Shop.</h1>
      </div>
      <ul className="flex  text-white space-x-4 gap-1 text-[18px] sm-gap-4">
        {user.isLoggedIn && user.role === "admin" ? (
          <li onClick={() => navigateUser("/admin")} className="cursor-pointer">
            {" "}
            Admin{" "}
          </li>
        ) : (
          <li onClick={() => navigateUser("/")} className="cursor-pointer">
            Home
          </li>
        )}
        <li onClick={() => navigateUser("/search")} className="cursor-pointer">
          <IoIosSearch className="text-2xl font-extrabold" />
        </li>
        <li
          onClick={() => navigateUser("/cart")}
          className="relative cursor-pointer"
        >
          <IoCartOutline className="text-2xl" />
          <p className="absolute top-[-0.9em]  text-red-600 left-2 ">
            {product.length}
          </p>
        </li>
        <li onClick={() => navigateUser("/login")} className="cursor-pointer">
          <MdLogout className="text-2xl" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
