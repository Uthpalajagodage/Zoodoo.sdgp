import React from "react";
import promoimg from "../images/promo1.jpg";
import promoimg2 from "../images/promo2.jpg";
import Button from "./Button";

const Promo = () => {
  return (
    <div className="flex justify-center items-center gap-6 mb-24">
      <div
        className="bg-cover w-full bg-center bg-no-repeat rounded-lg p-12"
        style={{ backgroundImage: `url(${promoimg})` }}
      >
        <p className="font-primary text-[16px]">Special Offer</p>
        <h1 className="font-secondary text-2xl font-semibold mb-4 text-black">
          Get 25% Off with <br /> Zoodo Today
        </h1>
        <Button
          text="Shop Now"
          bgColor="bg-primaryGreen"
          textColor="text-black"
        />
      </div>
      <div
        className="bg-cover w-full bg-center bg-no-repeat rounded-lg p-12"
        style={{ backgroundImage: `url(${promoimg2})` }}
      >
        <p className="font-primary text-[16px]">Special Offer</p>
        <h1 className="font-secondary text-2xl font-semibold mb-4 text-black">
          Get 25% Off with <br /> Zoodo Today
        </h1>
        <Button
          text="Shop Now"
          bgColor="bg-primaryGreen"
          textColor="text-black"
        />
      </div>
    </div>
  );
};

export default Promo;
