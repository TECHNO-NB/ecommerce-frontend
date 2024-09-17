import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional role check
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user)

  // Check if the user is logged in and optionally if the user has the required role
  const isAuthenticated = user.isLoggedIn;
  const hasRequiredRole = requiredRole ? user.role === requiredRole : true;

  if (isAuthenticated && hasRequiredRole) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
