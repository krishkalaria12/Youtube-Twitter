import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants/constants";

const NotRequireAuth = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default NotRequireAuth;
