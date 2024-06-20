import React from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import UploadProductForm from "../upload/UploadProductForm";

const AddProducts: React.FC = () => {
  return <div>
    <AdminNavbar/>
    <UploadProductForm/>
  </div>;
};

export default AddProducts;
