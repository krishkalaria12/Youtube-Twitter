import React, { useState } from "react";
import Logo from "../Components/Logo";
import Input from "../Components/Form/Input";
import Button from "../Components/Form/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";
import Cookies from "js-cookie";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Create FormData object to send to backend
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage);

    // Send request to backend
    try {
      setIsSubmitting(true);
      const res = await axiosInstance.post("/users/register", formDataToSend);
      if (res.data.data) {
        const data = {
          email: formData.email,
          password: formData.password
        }
        const response = await axiosInstance.post("/users/login", data);
        if (response.data.data) {
          Cookies.set('session-auth-access', response.data.data.accessToken, { expires: 1, secure: true, path: '/', sameSite: "strict" });
          Cookies.set('session-auth-refreshToken', response.data.data.refreshToken, { expires: 10, secure: true, path: '/', sameSite: "strict" });
          navigate("/")
          toast.success("Account created successfully");
          navigate("/")
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }

    setFormData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      avatar: null,
      coverImage: null,
    })
  };

  return (
    <div className="w-full h-screen text-white p-3 flex justify-center items-center sm:mt-8">
      <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
        <div className="flex space-x-2 justify-center items-center">
          <Logo />
          <div className="text-lg font-semibold uppercase">Youtube</div>
        </div>
        <form
          noValidate
          className="space-y-4 p-2 text-sm sm:w-96 w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full relative h-28 bg-[#222222]">
            {/* Cover Image Input */}
            <div className="w-full h-full">
              <label
                htmlFor="coverImage"
                className="cursor-pointer relative flex flex-col justify-center items-start"
              >
                {formData.coverImage ? (
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    className="w-full h-28 object-cover border-none border-slate-900"
                  />
                ) : (
                  <div className="w-full h-28 bg-transparent"></div>
                )}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="hover:text-purple-500 absolute inline-flex justify-center items-center w-full"
                  height={20}
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
                </svg>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="coverImage"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="absolute left-2 bottom-2 rounded-full border-2">
              {/* Avatar Input */}
              <div className="w-full">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer relative flex flex-col justify-center items-start"
                >
                  {formData.avatar ? (
                    <img
                      src={URL.createObjectURL(formData.avatar)}
                      className="object-cover rounded-full h-20 w-20 outline-none"
                    />
                  ) : (
                    <div className="object-cover rounded-full h-20 w-20 bg-transparent"></div>
                  )}
                  <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="hover:text-purple-500 absolute inline-flex justify-center items-center w-full"
                  height={20}
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
                </svg>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name="avatar"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">cover Image</div>
          </div>

          {/* Username Input */}
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"username"}
              type={"text"}
              label={"Username: "}
              name="username"
              value={formData.username}
              onchange={handleInputChange}
            />
          </div>
          {/* Full Name Input */}
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"fullName"}
              type={"text"}
              label={"FullName: "}
              name="fullName"
              value={formData.fullName}
              onchange={handleInputChange}
            />
          </div>
          {/* Email Input */}
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"email"}
              type={"email"}
              label={"Email*"}
              name="email"
              value={formData.email}
              onchange={handleInputChange}
            />
          </div>
          {/* Password Input */}
          <div className="w-full flex flex-col">
            <Input
              htmlFor={"password"}
              type={"password"}
              label={"Password:"}
              name="password"
              value={formData.password}
              onchange={handleInputChange}
            />
          </div>
          {/* Signup Button */}
          <Button submitting={isSubmitting} label={!isSubmitting ? "Signup" : "Signing In"} />
          {/* Login Link */}
          <p className="text-center text-sm">
            Already have an account?
            <Link
              className="text-purple-600 ml-2 cursor-pointer hover:opacity-70"
              to={"/login"}
              previewlistener="true"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
