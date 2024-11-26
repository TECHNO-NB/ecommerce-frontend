import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { addProductsTOCard } from "../redux/ProductSlice";
import { FaStar } from "react-icons/fa"; // Importing the star icon
import { useNavigate } from "react-router-dom";

interface CardProps {
  data: {
    _id: string;
    product: string;
    price: number;
    image: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const deleteOneProduct = async (id: string) => {
    const promptValue = window.prompt(
      "Are you sure you want to delete? If yes, write 'YES'"
    );

    if (promptValue !== "YES") {
      toast.error("Product not deleted");
      return;
    }
    try {
      axios.defaults.withCredentials = true;
      const deletedProduct = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/deleteoneproduct/${id}`
      );
      console.log(deletedProduct.data);
      toast.success("Product deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete product");
      console.log(error);
    }
  };

  const addToCart = (
    _id: string,
    product: string,
    image: string,
    price: number
  ) => {
    const cartProduct = {
      _id,
      product,
      image,
      price,
    };
    dispatch(addProductsTOCard(cartProduct));
    toast.success("Successfully Added");
  };

  return (
    <div className="mt-0 select-none lg:mt-2">
      <div className="flex justify-center items-center">
        <div className="card bg-[#0086FF] rounded-lg shadow-md overflow-hidden w-72 h-[350px] transition-transform duration-300 ease-in-out hover:-translate-y-1">
          {/* Image Container */}
          <div
            onClick={() => navigate(`/productdetails/${data._id}`)}
            className="h-[200px] bg-[#0086FF] cursor-pointer overflow-hidden flex items-center justify-center"
          >
            <img
              src={data.image}
              alt="Product"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* Content */}
          <div className="bg-white p-4 flex flex-col justify-between h-[150px]">
            <div>
              <div className="w-full flex  justify-between">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {data.product}
                </h3>
                <h3 className=" text-[10px] md:text-lg text-center flex items-center justify-center bg-orange-600 rounded-3xl text-white px-1 md:px-2 font-bold mb-2">
                  20% off
                </h3>
              </div>
              {/* Price with Star */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-base font-bold text-green-500">
                  ${data.price}
                </p>
                <div className="flex ">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                </div>
              </div>
            </div>
            {user.isLoggedIn && user.role !== "admin" ? (
              <button
                onClick={() =>
                  addToCart(data._id, data.product, data.image, data.price)
                }
                className="inline-block bg-[#0086FF] text-white px-5 py-2 rounded-md text-sm font-bold text-center transition-colors duration-300 ease-in-out hover:bg-blue-700"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => deleteOneProduct(data._id)}
                className="inline-block bg-[#0086FF] text-white px-5 py-2 rounded-md text-sm font-bold text-center transition-colors duration-300 ease-in-out hover:bg-blue-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
