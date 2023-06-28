import React from "react";
// import { useState } from "react";
import Button from "../components/Button";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useUserID";
import axios from "axios";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userID = useGetUserID();

  const logout = () => {
    setCookies("accessToken", "");
    setUser("");
    window.localStorage.clear();
    navigate("/LogIn");
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get(`/users/${userID}`);
        setUser(response.data.firstName);
      } catch (err) {
        console.log(err);
      }
    };

    getLoggedInUser();
  }, [userID]);

  return (
    <div>
      <nav className="flex justify-between items-center py-4">
        {/* logo */}
        <div>
          <h1 className="font-secondary text-primaryGreen font-semibold text-2xl">
            ZOODO
          </h1>
        </div>

        {/* menu items */}
        <div>
          <ul className="list-none sm:flex hidden gap-4 items-center font-primary font-semibold">
            <Link to="/">
              <li> Home </li>
            </Link>
            <Link to="/Shop">
              <li> Shop </li>
            </Link>
            <Link to="/AboutUs">
              <li> About </li>
            </Link>
            <Link to="/contact">
              <li> Contact </li>
            </Link>

            {/* {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  active === nav.title ? "text-primaryGreen" : "text-black"
                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))} */}
          </ul>
        </div>

        {/* buttons */}

        {!cookies.accessToken ? (
          <div className="flex gap-2 items-center justify-between">
            <Link to="/SignUp">
              <Button
                text="Sign Up/ Sign In"
                bgColor="bg-primaryGreen"
                textColor="text-white"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-between">
            <button
              className="font-normal px-4 py-2 rounded-[5px] font-primary bg-red-500 text-white"
              onClick={logout}
            >
              LogOut from {user}
            </button>
            <FaShoppingCart size={20} />
            <Link to="/Profile">
              <FaUser size={20} />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
