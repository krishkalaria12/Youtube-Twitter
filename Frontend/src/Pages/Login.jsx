import React, { useState } from "react";
import Logo from "../Components/Logo";
import Input from "../Components/Form/Input";
import Button from "../Components/Form/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Helper/axiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        setIsSubmitting(true);
        const response = await axiosInstance.post('/users/login', formData);
        if (response.data) {
          Cookies.set('session-auth-access', response.data.data.accessToken, { expires: 1, secure: true, path: '/', sameSite: "strict" });
          Cookies.set('session-auth-refreshToken', response.data.data.refreshToken, { expires: 10, secure: true, path: '/', sameSite: "strict" });
          toast.success("Login successful");
          navigate("/")
        }
      } catch (error) {
          console.log(error.response);
          const errorMessage = error.response?.data?.error || 'Login failed';
          console.log("login failed: ", errorMessage);
          toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
  }

  return (
    <div className="w-full h-screen text-white p-3 flex justify-center items-center sm:mt-8">
      <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
        <div className="flex space-x-2 justify-center items-center">
          <Logo />
          <div className="text-lg font-semibold uppercase">Youtube</div>
        </div>
        <form
          className="space-y-4 p-2 text-sm sm:w-96 w-full"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"email"}
              type={"email"}
              label={"Email"}
              name="email"
              value={formData.email}
              onchange={handleInputChange}
            />
          </div>
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"password"}
              type={"password"}
              label={"Password"}
              name="password"
              value={formData.password}
              onchange={handleInputChange}
            />
          </div>
          <Button submitting={isSubmitting} label={!isSubmitting ? "Login" : "Logging In"} />
          <p className="text-center text-sm">
            Don&#39;t have an account?{" "}
            <Link className="text-purple-600 cursor-pointer hover:opacity-70 ml-2" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
