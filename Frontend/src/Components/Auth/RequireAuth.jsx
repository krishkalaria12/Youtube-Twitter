import React from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import { Outlet } from "react-router-dom";
import LoginModal from "../LoginModal"
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Helper/axiosInstance";

function RequireAuth (){
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    auth().catch(() => setIsAuthenticated(false));
    setIsLoading(false);
  },[])
  
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await axiosInstance.post("/users/refresh-token", {
        refreshToken: refreshToken
      });
      if (res.status==200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.data.accessToken)
        localStorage.setItem(REFRESH_TOKEN, res.data.data.accessToken)
        setIsAuthenticated(true);
      }
      else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp
    const now = Date.now()/1000;

    if (tokenExpiration < now) {
      await refreshToken();
    }
    else {
      setIsAuthenticated(true);
    }
  }

  if (isLoading) {
    return <h1 className='font-bold text-white text-3xl'>Loading</h1>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <LoginModal />
  );
};

export default RequireAuth;
