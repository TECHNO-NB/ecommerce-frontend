import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteProducts } from "../redux/ProductSlice";

import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

interface ProductQuantity {
  [key: string]: number;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product);

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<ProductQuantity>({});

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const removeProduct = (id: string) => {
    dispatch(deleteProducts(id));
    setQuantities((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // Calculate the total price
  const totalPrice = products.reduce(
    (total, product) => total + product.price * (quantities[product._id] || 1),
    0
  );

  const handlePayment = async (price: Number) => {
    try {
      navigate("/payment", {
        state: { price: price, products: products },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-[0.5em] mt-[4.3rem] pb-2 select-none lg:px-[25em]">
        <h1 className="font-bold mt-6 text-xl ">Shopping Cart</h1>
        <div className="w-full flex flex-col mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card border flex items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <img
                  className="w-20"
                  src={product.image}
                  alt={product.product}
                />
                <div className="ml-4">
                  <h1 className="font-bold ">{product.product}</h1>
                  <p>{`$${product.price}`}</p>
                </div>
              </div>

              {/* right */}
              <div className="mr-2 md:mr-10 flex gap-2">
                <div className="flex gap-2 mr-3 items-center">
                  <p
                    onClick={() => decreaseQuantity(product._id)}
                    className="text-[30px] cursor-pointer"
                  >
                    -
                  </p>
                  <p className="text-[20px]">{quantities[product._id] || 1}</p>
                  <p
                    onClick={() => increaseQuantity(product._id)}
                    className="text-[20px] cursor-pointer"
                  >
                    +
                  </p>
                </div>
                <button
                  onClick={() => removeProduct(product._id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* card end here */}
          <div className="border py-2 mt-0 flex justify-between items-center sm:justify-around ">
            <div className="">
              <h1 className="font-bold">Order summary</h1>
              <div className="flex gap-4 justify-between  sm:gap-10">
                <p>Subtotal</p>
                <p>{`$${totalPrice.toFixed(2)}`}</p>
              </div>

              <div className="flex gap-4 justify-between  sm:gap-10">
                <p>Shipping estimate</p>
                <p>$0.00</p>
              </div>

              <div className="flex gap-4 justify-between  sm:gap-10">
                <p>Tax estimate</p>
                <p>$0.00</p>
              </div>
              <h1 className="font-bold  text-xl ">{`Total: $${totalPrice.toFixed()}`}</h1>
            </div>

            {products.length === 0 ? null : (
              <div className="mr-2 md:mr-6">
                <button
                  onClick={() => handlePayment(totalPrice)}
                  className="border-2 bg-green-500 px-2 py-1 text-white"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate("/order")}
          className="m-auto border-2  bg-red-500 mt-5 text-white p-2 rounded-lg "
        >
          My Orders
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
