import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const RouteGuard = ({ children, setShowMenu }) => {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let isAuthenticated = false;

    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        isAuthenticated = true;
        setShowMenu(true);
      } else {
        isAuthenticated = false;
        setShowMenu(false);
      }
    } else {
      isAuthenticated = false;
      setShowMenu(false);
    }

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, setShowMenu]);

  return <>{children}</>;
};

export default RouteGuard;