import React from "react";
import { Link } from "react-router-dom";
import Button from "./Form/Button";

function LoginModal() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
        <div className="flex flex-col gap-2 items-center mb-10">
          <Link
            className="flex gap-2 items-center"
            href="/"
            previewlistener="true"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              color="#A855F7"
              height={30}
              width={30}
              xmlns="http://www.w3.org/2000/svg"
              style={{color: "rgb(168, 85, 247)"}}
            >
              <path d="M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z"></path>
            </svg>
            <span className="font-bold text-white">YOUTUBE</span>
          </Link>
        </div>
        <p className="text-xl font-medium mb-2">Login or Signup to continue</p>
        <Link to={"/login"} previewlistener="true">
          <Button label={"Login"} />
        </Link>
      </div>
    </div>
  );
}

export default LoginModal;
