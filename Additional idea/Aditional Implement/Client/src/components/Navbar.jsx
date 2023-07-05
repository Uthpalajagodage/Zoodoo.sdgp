import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
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
            <Link to="/contactus">
              <li> Contact US </li>
            </Link>
            <Link to="/foodRecipeSearch">
              <li> Search for Recipes </li>
            </Link>
            <Link to="/AboutUs">
              <li> About </li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-2 items-center justify-between">
            <Link to="/SignUp">
              <Button
                text="Sign Up/ Sign In"
                bgColor="bg-primaryGreen"
                textColor="text-white"
              />
            </Link>
          </div>
      </nav>
    </div>
    
  );
};

export default Navbar;
