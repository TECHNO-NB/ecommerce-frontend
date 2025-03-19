import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";




const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-[#EEEFFB] flex justify-center  flex-col items-center py- ygap-10 flex-wrap mx-auto px-2 pb-4  md:px-16 lg:px-20">
        <div className="div flex gap-16 flex-wrap">
          <div className="title">
            <h1 className="text-2xl font-bold">Scatch</h1>
            <div className="input flex mt-5">
              <input
                className="px-2"
                type="email"
                placeholder="Enter Email Address"
              />
              <button className="mt-0 bg-pink-500 text-white px-6 py-2  shadow-lg hover:bg-pink-600 transition">
                Sign Up
              </button>
            </div>
            <p className="mt-2 text-[#8A8FB9]">Contact info</p>
            <p className="text-[#8A8FB9]">Bank road, Madane purkot daha</p>
          </div>

          <div className="title">
            <h1 className="text-2xl ">Catagories</h1>
            <div className="input flex mt-5 flex-col text-[#8A8FB9]">
              <p className="mt-">Laptops & Computers</p>
              <p>Cameras & Photography</p>
              <p className="mt-">Smart Phones & Tablets</p>
              <p>Video Games & Consoles</p>
              <p>Waterproof Headphones</p>
            </div>
          </div>

          <div className="title">
            <h1 className="text-2xl ">Customer Care</h1>
            <div className="input flex mt-5 flex-col text-[#8A8FB9]">
              <p className="mt-">My Account</p>
              <p>Discount</p>
              <p className="mt-">Returns</p>
              <p>Orders History</p>
              <p>Order Tracking</p>
            </div>
          </div>

          <div className="title  ">
            <h1 className="text-2xl ">Pages</h1>
            <div className="input flex mt-5 flex-col text-[#8A8FB9]">
              <p className="mt-">Blog</p>
              <p>Browse the Shop</p>
              <p className="mt-">Category</p>
              <p>Pre-Built Pages</p>
              <p>Visual Composer Elements</p>
              <p>WooCommerce Pages</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer bg-[#E7E4F8]  text-center flex justify-center mx-auto px-2 md:px-16 lg:px-20 items-center ">
        <div className="txt flex items-center justify-between md:justify-around w-full ">
          <h1 className="text-[#9DA0AE] text-[1rem] sm:text-xl">
            &copy;Scatch - All Rights Reserved
          </h1>
       <div className="icons flex gap-2">
       <FaFacebookF/>
       <FaInstagram/>
       <FaTwitter/>
       </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
