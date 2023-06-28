import React from "react";
import heroImg from "../images/heroimg.jpg";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center justify-center my-4">
      {/* text content */}
      <div className="basis-2/3">
        <p className="font-primary text-black font-normal text-[18px]">
          {" "}
          your one-stop solution for healthy Life
        </p>
        <h1 className="font-secondary font-semibold text-6xl text-primaryGreen my-3">
          Healthy Food and <br /> Nutrient Analysis at <br /> Your Fingertips
        </h1>
        <p className="font-primary text-black font-normal text-[18px]">
          Nourish Your Body, with Zoodo
        </p>

        <div className="mt-6">
          <Link to="/Shop">
            <Button
              text="View Foods"
              bgColor="bg-primaryGreen"
              textColor="text-white"
            />
          </Link>
        </div>
      </div>

      {/* image content */}
      <div className="basis-1/3">
        <img src={heroImg} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Hero;
