import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token"); // Check if the user has a token

  // Render the element if the token exists; otherwise, redirect to login
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
