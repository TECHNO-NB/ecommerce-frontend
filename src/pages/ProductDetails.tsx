import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getsingleproduct/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Failed to load product details. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen select-none bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
            <img
              src={data?.image || "https://via.placeholder.com/400"}
              alt={data?.product || "Product Image"}
              className="rounded-lg w-full object-cover max-h-96"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {data?.product || "Product Name"}
            </h2>
            <p className="mt-4 text-gray-600">
            This is a detailed description of the product. It highlights the
            features, benefits, and {data?.description || "No description available."}
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-800">
                ${data?.price || "0.00"}
              </span>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600">Color</h3>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-red-500 border-2 border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"></button>
                <button className="w-6 h-6 rounded-full bg-green-500 border-2 border-gray-300 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 ml-2"></button>
              </div>
            </div>

            {/* Size Options */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600">Size</h3>
              <div className="flex items-center mt-2 space-x-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-600"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button className="w-full bg-blue-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
