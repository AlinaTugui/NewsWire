import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";
export default function SignupForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.username !== "" &&
      values.email !== "" &&
      values.password !== ""
    ) {
      localStorage.setItem("credDetails", JSON.stringify(values));
      toast.success("Sign Up Success");
      navigate("/login");
    } else {
      toast.error("Sign Up Failed");
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <TailwindToaster />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-red-700 underline uppercase decoration-wavy">
          Sign Up
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              for="text"
              className="block text-sm font-semibold text-gray-800"
            >
              User Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              Sign up
            </button>
          </div>
        </form>
        <Link to="/login">
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <span className="font-medium text-red-600 hover:underline">
              Login
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