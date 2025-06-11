import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import "./Header.css";
import Search from "../Search";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton
} from "@mui/material";
import { getUserByEmail } from "../../network/usersApi";

function Header({ toggle }) {
  const [scrollNav, setScrollNav] = useState(false);
  const [name, setNameState] = useState("Sign Up or Login");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const changeNav = () => {
      if (window.scrollY >= 60) {
        setScrollNav(true);
      } else {
        setScrollNav(false);
      }
    };
    const email = localStorage.getItem("email");
    console.log("acesta e mailu")
    console.log(email)
    if (email)
      getUserByEmail(email)
        .then((user) => {
          console.log("user")
          console.log(user)
          setPicture(user.picture);
        })
        .catch((error) => {
          console.log("the user does not exist");
        });

    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("newsList")
    setNameState("Sign Up or Login")
    //navigate("/");
  };

  return (
    <header
      className={`bg-gray-700 sticky flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:justify-between p-6 ${toggle && "header__toggle"
        } ${scrollNav && "scrolling"}`}
    >
      <HashLink smooth to="#top" className="logo-link">
        {" "}
        <h1 className="transition duration-700 bg-gradient-to-r from-transparent to-red-700 px-4 py-2 rounded-md shadow-lg text-white text-2xl font-bold hover:ring-1 hover:ring-white">
          NewsWire
        </h1>{" "}
      </HashLink>
      <div class="flex">
        <Link to="/bookmark">
          <h1 className="px-4 py-2 rounded-md shadow-lg text-white text-md mr-4">
            Your Bookmarks
          </h1>{" "}
        </Link>
        {localStorage.getItem("token") ? (
          <Link to="/" onClick={handleLogOut}>
            <h1 className="px-4 py-2 rounded-md shadow-lg text-white text-md mr-4">
              {"Logout"}
            </h1>
          </Link>
        ) : (
          <Link to="/signup" >
            <h1 className="px-4 py-2 rounded-md shadow-lg text-white text-md mr-4">
              {"SignUp or Login"}
            </h1>
          </Link>
        )}
        <Search />
        {localStorage.getItem("token") &&
          (<IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <div
              onClick={() => {
                navigate("/user-profile");
              }}
            >
              <Avatar
                sx={{
                  width: 55,
                  height: 55,
                  border: "2px solid white",
                }}
                alt="Remy Sharp"
                src={
                  picture !== ""
                    ? `http://localhost:8080/users/download/${picture}`
                    : require("../../resources/images/profile_picture.jpg")
                }
              />
            </div>
          </IconButton>)}
      </div>
    </header>
  );
}

export default Header;
