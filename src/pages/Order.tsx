import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";

type Product = {
  product: string;
  price: number;
};

type Order = {
  _id: string;
  product: Product;
  quantity: number;
  status: string;
};

const Order: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/getorderdetails`
        );
        console.log("Orders fetched:", response.data);
        setOrders(response.data.data); // Assuming the response has `data` containing orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
          <header className="bg-blue-500 text-white text-lg font-semibold px-4 py-3 rounded-t-lg">
            Order Management
          </header>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 border-b">Order ID</th>
                  <th className="p-4 border-b">Product</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Quantity</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index: any) => (
                  <tr
                    key={order._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="p-4 border-b">{index}</td>
                    <td className="p-4 border-b">{order.product.product}</td>
                    <td className="p-4 border-b">${order.product.price}</td>
                    <td className="p-4 border-b">{order.quantity}</td>
                    <td
                      className={`p-4 border-b font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="bg-gray-100 p-4 text-center text-gray-700">
            Thank you for trusting us! 😊
          </footer>
        </div>
      </div>
    </>
  );
};

export default Order;
