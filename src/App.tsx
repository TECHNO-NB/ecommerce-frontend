import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AdminHome from "./admin/AdminHome";
import AdminProtected from "./protectedRoute/AdminProtected";

import AddProducts from "./admin/adminpages/AddProducts";
import Cart from "./pages/Cart";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminHome />
            </AdminProtected>
          }
        />
         <Route
          path="/uploadproducts"
          element={
            <AdminProtected>
              < AddProducts/>
            </AdminProtected>
          }
        />
      </Routes>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid black",
            padding: "4px",
            color: "green",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
