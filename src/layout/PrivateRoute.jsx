import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userId = localStorage.getItem("userId");
  return userId ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
