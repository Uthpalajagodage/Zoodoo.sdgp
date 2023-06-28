import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useGetUserID } from "../hooks/useUserID";

import * as tf from "@tensorflow/tfjs";

const BuyFood = () => {
  const { id } = useParams();
  const [foodItem, setFooditem] = useState("");
  const [count, setCount] = useState(1);
  //const [user, setUser] = useState(null);
  const userID = useGetUserID();
  const [nutrients, setNutrients] = useState([]);
  const [healthIssues, setHealthIssues] = useState("");
  const [isModelLoading, setIsModelLoading] = useState(false);

  // model part
  const [prediction, setPrediction] = useState(
    "press generate health report button to get health report"
  );
  const [model, setModel] = useState("");

  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     try {
  //       const response = await axios.get(`/users/${userID}`);
  //       console.log(response.data);
  //       setUser(response.data);
  //       console.log(user);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getLoggedInUser();
  // }, [userID, user]);

  useEffect(() => {
    fetch(`/foods/${id}`).then((response) => {
      response.json().then((foodInfo) => {
        setFooditem(foodInfo);
      });
    });
  }, [id]);

  const loadModel = async () => {
    setIsModelLoading(true);
    const model = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/Sathmikasenadheera01/mltesting/master/zodoofoodclassification_model_tfjs/model.json"
    );
    setModel(model);
    setIsModelLoading(false);
  };

  useEffect(() => {
    loadModel();
    // eslint-disable-next-line
  }, []);

  const predict = async (img) => {
    const foodList = [
      "apple_pie",
      "cheesecake",
      "chicken_curry",
      "chicken_wings",
      "chocolate_cake",
      "chocolate_mousse",
      "club_sandwich",
      "donuts",
      "fish_and_chips",
      "french_fries",
      "french_toast",
      "fried_rice",
      "frozen_yogurt",
      "garlic_bread",
      "greek_salad",
      "hamburger",
      "hot_dog",
      "ice_cream",
      "lasagna",
      "macaroni_and_cheese",
      "omelette",
      "pancakes",
      "pizza",
      "ramen",
      "samosa",
      "shrimp_and_grits",
      "spaghetti_carbonara",
      "spring_rolls",
      "steak",
      "strawberry_shortcake",
      "sushi",
      "tacos",
      "waffles",
    ];

    const tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([299, 299])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const predictions = await model.predict(tensor).array();
    if (Math.max(...predictions[0]) < 0.99) {
      setPrediction("");
    } else {
      var predictedClassIndex = predictions[0].indexOf(
        Math.max(...predictions[0])
      );
      console.log(predictedClassIndex);
      console.log(foodList[predictedClassIndex]);
      const predictedFood = foodList[predictedClassIndex];
      const finalPrediction = predictedFood.replace("_", " ");
      setPrediction(finalPrediction);
    }
  };

  // image preprocessing
  const loadImage = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        resolve(img);
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  };

  const apiCall = async () => {
    // nutrition api call
    try {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "d11e2b85",
            "x-app-key": "0d432fc21d533c492dc7967e56a4d0b4",
          },
          body: JSON.stringify({
            query: prediction,
            timezone: "US/Eastern",
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  //show health issues
  const showHealthIssues = () => {
    fetch(`/healthIssues/${foodItem.name}`).then((response) => {
      response.json().then((healthIssuesSet) => {
        setHealthIssues(healthIssuesSet);
      });
    });
    console.log(healthIssues);
  };

  const showNutritions = async () => {
    const image = await loadImage(foodItem.imageURL);
    await predict(image);
    const data = await apiCall();
    const dataNutrients = await data.foods[0];
    setNutrients(dataNutrients);
    showHealthIssues();
  };

  const minimizeCount = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const maximizeCount = () => {
    setCount(count + 1);
  };

  const handleBuyNow = async () => {
    if (!userID) {
      alert("please login first");
    } else {
      const foodID = foodItem._id;
      const UserID = userID;
      const response = await fetch("/buyHistory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodID,
          UserID,
        }),
      });

      const data = await response.json();

      if (response.status === 400) {
        alert(data.message);
      } else {
        alert("food added to your history");
      }
    }
  };

  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  return (
    <div>
      {/* food display */}
      <section className="md:flex items-center justify-center my-20">
        {/* image div */}
        <div className="basis-1/2">
          <img src={foodItem.imageURL} alt="selected food" className="w-3/4" />
        </div>

        {/* food info*/}
        <div className="basis-1/2 font-primary">
          <div>
            <h2 className="font-secondary font-bold text-2xl text-black">
              {foodItem.name}
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              doloribus vero, deleniti provident iste explicabo.
            </p>
          </div>

          {/* price and qty */}
          <div className="flex items-center gap-20 mt-8">
            <h2 className="font-primary text-primaryGreen font-medium text-xl">
              Rs{foodItem.price * count}.00
            </h2>
            <div className="flex gap-6 items-center">
              <button
                className="px-4 py-2 bg-red-500 font-bold text-white text-2xl"
                onClick={minimizeCount}
              >
                -
              </button>
              <span className="px-4 py-3 bg-secondaryGreen text-black font-medium">
                {count}
              </span>
              <button
                className="px-4 py-2 bg-primaryGreen font-bold text-white text-2xl"
                onClick={maximizeCount}
              >
                +
              </button>
            </div>
          </div>

          {/* buy now and cart button */}
          <div className="flex items-center gap-4 mt-8">
            <button
              className="px-4 py-2 rounded-[5px] font-primary bg-primaryGreen text-white font-medium"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <FaShoppingCart
              size={20}
              className="cursor-pointer text-slate-800"
            />
          </div>

          {/* generate health report button */}
          <div className="mt-16">
            <button
              className="px-4 py-2 rounded-[5px] font-primary bg-primaryGreen text-white font-medium"
              onClick={showNutritions}
            >
              Generate Health Report
            </button>
          </div>
        </div>
      </section>

      {/* nutrition report */}
      <section className="md:flex items-start justify-start my-20 bg-secondaryGreen px-4 py-5 rounded-md gap-10">
        <div className="basis-1/2">
          <h1 className="font-bold text-black font-secondary text-xl">
            Zoodoo Nutrition report
          </h1>
          <p className="font-primary text-gray-700 font-medium text-[15px]">
            our machine learning model identified this food as
          </p>
          <p className="bg-primaryGreen rounded-md p-3 text-white font-primary my-2">
            {prediction
              ? prediction
              : "cannot identify selected food correctly. we are sorry!"}
          </p>

          <p className="bg-red-500 p-2 text-white font-primary rounded-md mt-3">
            We give you standard nutrients values. these values can be vary
            according to ingredients and brands.
          </p>

          <p className="mt-3 font-primary">
            If you continuosly eat foods like this, You may have;
          </p>
          <div className="bg-red-500 text-white font-primary rounded-md mt-3 p-3">
            <p>
              {healthIssues
                ? healthIssues[0].healthIssues
                : "future health diseases will display here"}
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-gray-700 font-secondary text-xl">
            Nutritional Values of this food
          </h1>
          <div className="rounded-md p-3 font-primary">
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>
                Serving Weight(g)/ quantity:{" "}
                {nutrients ? nutrients.serving_weight_grams : "press button"}
              </span>
            </div>
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>
                Number of Calories:
                {nutrients ? nutrients.nf_calories : "press button"}
              </span>
            </div>
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>
                Protein(g): {nutrients ? nutrients.nf_protein : "press button"}
              </span>
            </div>
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>
                carbohydrate(g):
                {nutrients ? nutrients.nf_total_carbohydrate : "press button"}
              </span>
            </div>
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>
                Total fat(g):
                {nutrients ? nutrients.nf_total_fat : "press button"}
              </span>
            </div>
            <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1">
              <span>sugar(g): {nutrients.nf_sugars}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyFood;
