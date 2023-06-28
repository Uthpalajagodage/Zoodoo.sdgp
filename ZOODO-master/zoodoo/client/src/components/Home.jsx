import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Hero from "./Hero";
import Button from "./Button";
import Card from "./Card";
import Features from "./Features";
import Promo from "./Promo";

import whyusimg from "../images/whyus.jpg";

const Home = () => {
  const [foods, setFoods] = useState();

  const fetchFoods = () => {
    fetch("/foods")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods(data);
      });
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      <Hero />

      {/* discover food section */}
      <div className="flex justify-between items-center mt-24 mb-8">
        {/* text */}
        <div>
          <h1 className="font-secondary text-black text-2xl font-bold">
            DISCOVER FOODS
          </h1>
          <p className="font-primary text-primaryGreen font-normal text-[16px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, iusto{" "}
            <br />
            non odit repellendus error possimus.
          </p>
        </div>

        {/* button */}
        <div>
          <Link to="/Shop">
            <Button
              text="Discover More"
              bgColor="bg-secondaryGreen"
              textColor="text-black"
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-6 mt-4 mb-24 mx-auto justify-center">
        {foods &&
          foods
            .slice(0, 5)
            .map((food) => (
              <Card
                key={food._id}
                foodImage={food.imageURL}
                foodName={food.name}
                price={food.price}
                id={food._id}
              />
            ))}
      </div>

      {/* why zoodoo */}
      <section className="flex items-center justify-between gap-5 mb-24">
        {/* image */}
        <div className="basis-2/5 h-auto">
          <img src={whyusimg} alt="healthy dish" className="rounded-l-md" />
        </div>

        {/* text */}
        <div className="basis-3/5 h-auto">
          <h1 className="font-semibold font-secondary text-black text-2xl">
            WHY WE ARE DIFFERENT
          </h1>
          <p className="font-primary text-primaryGreen text-[18px] mb-4">
            Discover the World of Healthy Eating with Zoodo's <br /> Wide
            Selection of Nutritious Meals
          </p>
          <p className="font-primary text-black text-[16px]">
            With Zoodo, our advanced food ordering app, Not only can you order
            your favorite meals with ease, but you can also get detailed
            information about the nutrients they contain. <br />
            <br /> Our state-of-the-art artificial intelligence algorithm
            analyzes each dish and presents the information in an
            easy-to-understand format. Whether you're following a specific diet,
            trying to lose weight, or just looking to improve your overall
            health, Zoodo has got you covered. <br />
            <br /> With Zoodo, you can say goodbye to the guesswork and hello to
            a healthier, happier you. Upgrade your food ordering experience
            today with Zoodo!
          </p>
        </div>
      </section>

      {/* features section */}
      <Features />

      {/* text section */}
      <section className="flex justify-center items-center">
        <div className="lg:pb-16 lg:px-16 text-center">
          <h1 className="font-secondary text-primaryGreen text-2xl mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            nisi est iusto quas qui velit incidunt.
          </h1>
          <p className="font-primary text-black mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            dignissimos autem nulla asperiores error? Obcaecati ullam
            dignissimos nobis molestias illo ab fugit officiis?
          </p>
          <Button
            text="Learn More"
            bgColor="bg-primaryGreen"
            textColor="text-white"
          />
        </div>
      </section>

      {/* promo section */}
      <Promo />
    </div>
  );
};

export default Home;
