import React, { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";

const AdminHome: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        setIsloading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getallproducts`
        );
        setIsloading(false);
        setProducts(res.data.data);
      })();
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }, []);

  const deleteAllProducts = async () => {
    const promptVal = window.prompt(
      "Are you sure you want to delete all products? If yes, write 'YES ALL PRODUCTS'"
    );
    if (promptVal !== "YES ALL PRODUCTS") {
      toast.error("Product not deleted");
      return;
    }
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/product/deleteallproducts`
      );
      console.log(res.data);
      toast.success("SuccessFully Deleted All Products");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Products Are Not Delete");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <button
        onClick={deleteAllProducts}
        className="ml-5 mt-2 bg-red-600 text-white px-3 text-xl py-1  md:mt-4 md:ml-20"
      >
        Delete All
      </button>

      <div>
        {isLoading ? <Loader /> : null}

        <div className="flex  w-[100vw] px-20 flex-col items-center lg:items-start sm:px-16 lg:flex-row">
          <div className="grid  w-[97.8vw] gap-4 gap-x-2  grid-y-2 mt-2  gap-y-2 lg:gap-y-0 grid-cols-2 md-gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:w-[98vw] ">
            {products.map((v) => (
              <Card key={v} data={v} />
            ))}
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default AdminHome;
