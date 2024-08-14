import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, user } = useAuthStore((state) => state);
  useEffect(() => {
    if (!isLoggedIn || !token || !user) {
      return navigate("/join");
    }
  }, []);
  return <Outlet />;
};
