import React from "react";
import Button from "./Button";

import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const card = (props) => {
  return (
    <div className="w-44 rounded-md shadow-xl pb-4">
      {/* image */}
      <div className="overflow-hidden">
        <img src={props.foodImage} alt="food" className="rounded-t-md" />
      </div>

      {/* content */}
      <div className="px-2">
        <h2 className="font-primary font-semibold text-[18px] text-black leading-0">
          {props.foodName}
        </h2>
        <p className="font-primary font-normal text-[16px] text-slate-900">
          rs {props.price}.00
        </p>
      </div>

      {/* buttons */}
      <div className="flex items-center justify-between mt-2 px-2">
        <Link to={`/buyFood/${props.id}`}>
          <Button
            text="Buy Now"
            bgColor="bg-primaryGreen"
            textColor="text-white"
          />
        </Link>
        <FaShoppingCart size={20} className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
};

export default card;
