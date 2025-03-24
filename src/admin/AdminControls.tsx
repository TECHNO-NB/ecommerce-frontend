import { useEffect, useState } from "react";

import AdminNavbar from "./adminNavbar/AdminNavbar";
import axios from "axios";

const AdminControls = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg">
        <div className="flex space-x-4 border-b pb-2 bg-white p-4 rounded-lg">
          {[
            { key: "users", label: "Users" },
            { key: "products", label: "Products" },
            { key: "orders", label: "Orders" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
          {activeTab === "users" && <UsersTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "orders" && <OrdersTab />}
        </div>
      </div>
    </>
  );
};

const UsersTab = () => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    const fetchUSers = async () => {
     try {
      axios.defaults.withCredentials = true;
      const users= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getallusers`);
      
      setUsers(users.data.data)
     } catch (error) {
      console.error(error);
     }
    };
    fetchUSers();
  }, []);
 
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="space-y-3">
        {users && users.map((user:any) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow"
          >
            <span>
              {user.fullName} - {user.role}
            </span>
            <div className="space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">
                Make Admin
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsTab = () => {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const fetchUSers = async () => {
     try {
      axios.defaults.withCredentials = true;
      const products= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getallproducts`);
      
      setProducts(products.data.data)
     } catch (error) {
      console.error(error);
     }
    };
    fetchUSers();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="space-y-3">
        {products.map((product:any) => (
          <div
            key={product._id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow"
          >
            <span>
              {product.product} - ${product.price}
            </span>
            <div className="space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState<any>([]);
  useEffect(() => {
    const fetchUSers = async () => {
     try {
      axios.defaults.withCredentials = true;
      const orders= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getallorders`);
      console.log("orders",orders.data.data)
      setOrders(orders.data.data)
     } catch (error) {
      console.error(error);
     }
    };
    fetchUSers();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="space-y-3">
        {orders.map((order:any) => (
          <div
            key={order._id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow"
          >
            <span>
              {order.user.fullName} - {order.status}
            </span>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded">
              Change Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminControls;
