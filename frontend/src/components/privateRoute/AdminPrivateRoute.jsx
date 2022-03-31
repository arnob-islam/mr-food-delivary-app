import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.AdminReducer);
  const admin_session = sessionStorage.getItem("__admin")
    ? JSON.parse(sessionStorage.getItem("__admin"))
    : {};

  return Object.keys(admin).length === 0 ||
    Object.keys(admin_session).length === 0 ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicRoute;
