import React, { useState, useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AdminProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("persist:root")
  );
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user.isLoggedIn && token && user.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminProtected;
