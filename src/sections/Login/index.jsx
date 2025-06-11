import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import axios from "axios"
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("suntem in handle submit")
    try {
      const response = await axios.post("http://localhost:8080/login", {email,password}); // Replace "/api/login" with your actual backend login endpoint
      console.log("raspunsul")
      // Assuming the response contains a token or user object
      const  token  = response.data;
  
      // Store the token in localStorage or any other state management solution
      localStorage.setItem("token", token.token);
      
      localStorage.setItem("email", token.email);
      localStorage.setItem("id", token.id.toString());
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error.message)
      toast.error("Login Failed");
    }

  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <TailwindToaster/>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-red-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-red-700 underline uppercase decoration-wavy">
          Login
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleEmailChange}
              className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* <a href="#" className="text-xs text-red-600 hover:underline">
            Forget Password?
          </a> */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/signup">
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have account{" "}
            <span className="font-medium text-red-600 hover:underline">
              Signup
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
const TailwindToaster = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message)}</p>
        </Transition>
      )}
    </Toaster>
  );
};