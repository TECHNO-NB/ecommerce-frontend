import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AdminHome from "./admin/AdminHome";
import AdminProtected from "./protectedRoute/AdminProtected";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AddProducts from "./admin/adminpages/AddProducts";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Search from "./pages/Search";

import UserVerifier from "./components/UserVerifier"; // New component for user verification
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";

const App: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="771984729352-gnod99m6of797a0sk3v0liairf4mlujo.apps.googleusercontent.com">
        <UserVerifier />
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
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
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productdetails/:id"
            element={
              <ProtectedRoute>
                <ProductDetails/>
              </ProtectedRoute>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminProtected requiredRole="admin">
                <AdminHome />
              </AdminProtected>
            }
          />
          <Route
            path="/uploadproducts"
            element={
              <AdminProtected requiredRole="admin">
                <AddProducts />
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
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
