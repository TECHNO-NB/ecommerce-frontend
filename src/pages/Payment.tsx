import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonLoader from "../components/ButtonLoader";

const Payment: React.FC = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handlePayment = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      axios.defaults.withCredentials = true;
      const payment = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment`,
        {
          price: location.state.price,
          products: location.state.products,
        }
      );

      setLoader(false);

      if (payment.status === 201) {
        toast.success("Payment successfully");
        navigate("/order");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      toast.error("Payment error");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white mb-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 w-8 bg-yellow-300 rounded-sm mb-2"></div>
                <p className="text-sm">BANK</p>
              </div>
              <div className="text-2xl">💳</div>
            </div>
            <div className="text-lg font-bold tracking-widest mt-4">
              1234 5678 9012 3456
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>12/24</span>
              <span>Cardholder Name</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Card Number
              </label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-1">MM</label>
                <input
                  type="text"
                  required
                  placeholder="MM"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-1">YY</label>
                <input
                  type="text"
                  required
                  placeholder="YY"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-1">CVV</label>
                <input
                  type="text"
                  required
                  placeholder="CVV"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={(e) => handlePayment(e)}
              className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600 flex items-center justify-center"
            >
              {loader ? <ButtonLoader /> : "Pay Now"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className=" justify-self-center items-center mx-auto border"
            >
              back to cart
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
