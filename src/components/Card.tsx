import React from "react";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { addProductsTOCard } from "../redux/ProductSlice";

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

  const deleteOneProduct = async (id: string) => {
    const promptValue = window.prompt(
      "Are you sure you want to delete? If yes, write 'YES'"
    );

    if (promptValue !== "YES") {
      toast.error("Product not deleted");
      return;
    }
    try {
      const deletedProduct = await axios.delete(
        `/api/product/deleteoneproduct/${id}`
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
    toast.success("SuccessFully Added")
  };

  return (
    <div className="mt-0 select-none lg:mt-2">
      <div className="bg-[#F4DCD2] h-[11em] flex items-center justify-center md:h-[13em]">
        <img
          className="w-48 h-full -z-1 md:h-auto"
          src={data.image}
          alt={data.product}
        />
      </div>
      <div className="bg-[#DEBEAE] h-[4em] z-10 flex justify-between items-center px-2 md:px-12 lg:h-[5em]">
        <div className="text-[17px] sm:text-[19px] lg:text-[20px]">
          <h1>{data.product}</h1>
          <div className="flex gap-3 items-center sm:gap-8">
            <p>{`$ ${data.price}`}</p>
            <div className="bg-red-600 text-[10px] h-[18px] text-white text-center rounded-full px-2 flex items-center justify-center sm:text-sm sm:h-[25px]">
              <p className="">-100%</p>
            </div>
          </div>
        </div>
        {user.isLoggedIn && user.role === "admin" ? (
          <button
            onClick={() => deleteOneProduct(data._id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Delete
          </button>
        ) : (
          <div
            onClick={() =>
              addToCart(data._id, data.product, data.image, data.price)
            }
            className="bg-white rounded-full mr-1 cursor-pointer"
          >
            <IoIosAdd className="text-black text-3xl lg:text-4xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
