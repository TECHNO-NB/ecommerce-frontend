import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

interface AdminProtectedRoute {
  children: ReactNode;
  requiredRole: string;
}

const AdminProtected: React.FC<AdminProtectedRoute> = ({
  children,
  requiredRole,
}) => {
  const user = useSelector((state: any) => state.user);
;

  if (user.role === "admin" && user.isLoggedIn && requiredRole === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default AdminProtected;
