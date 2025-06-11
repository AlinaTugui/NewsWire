import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginForm from "./sections/Login/index";
import SignupForm from "./sections/Signup/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Bookmark from "./sections/Bookmark";
import Login from "./sections/Login/Login";
import SignUp from "./sections/Signup/SignUp";
import UserProfile from "./sections/profile/UserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      { <Route path="/" element={<App />} />}
      {!localStorage.getItem("token") && <Route path="/signup" element={<SignUp />} />}
      {localStorage.getItem("token") && <Route path="/" element={<App />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/user-profile" element={<UserProfile/>}/>
    </Routes>
  </Router>
);
