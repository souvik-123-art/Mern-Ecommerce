import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>; // ✅ Wrap in a fragment
};

export default ProtectedRoute;
