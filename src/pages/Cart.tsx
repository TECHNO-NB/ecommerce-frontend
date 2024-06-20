import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteProducts } from "../redux/ProductSlice";

interface ProductQuantity {
  [key: string]: number; // key is the product _id
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product);

  // State to manage the quantity of each product
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

  return (
    <div>
      <Navbar />
      <div className="px-[0.5em] select-none lg:px-[25em]">
        <h1 className="font-bold mt-6 text-xl ">Shopping Cart</h1>
        <div className="w-full flex flex-col mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card border flex items-center justify-between mb-4"
            >
              {/* left */}
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
          <div className="border py-2 mt-2 flex items-center ">
            <h1 className="font-bold ml-4 text-xl ">{`Total: $${totalPrice.toFixed(
              2
            )}`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
