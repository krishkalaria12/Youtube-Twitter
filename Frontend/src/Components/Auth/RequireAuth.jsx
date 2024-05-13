import React from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import { Outlet } from "react-router-dom";
import LoginModal from "../LoginModal"
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Helper/axiosInstance";
import Cookies from "js-cookie";

function RequireAuth (){
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    auth().catch(() => setIsAuthenticated(false));
    setIsLoading(false);
  },[])
  
  const refreshToken = async () => {
    const refreshToken = Cookies.get('session-auth-refreshToken');
    try {
      const res = await axiosInstance.post("/users/refresh-token", {
        refreshToken: refreshToken
      });
      if (res.status==200) {
        Cookies.set('session-auth-access', res.data.data.accessToken, { expires: 1, secure: true, path: '/', sameSite: "strict" });
        Cookies.set('session-auth-refreshToken', res.data.data.refreshToken, { expires: 10, secure: true, path: '/', sameSite: "strict" });
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
    const token = Cookies.get('session-auth-access');
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
