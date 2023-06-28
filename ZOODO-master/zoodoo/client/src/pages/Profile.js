import { useGetUserID } from "../hooks/useUserID";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { dietPlans } from "../constants/dietPlans.js";

const Profile = () => {
  const userID = useGetUserID();
  const [user, setUser] = useState("");
  const [bmi, setBmi] = useState();
  const [healthStatus, setHealthStatus] = useState("");
  const navigate = useNavigate();
  const [foods, setFoods] = useState(null);
  //let foodIndexArray = [];

  const [nutrients, setNutrients] = useState([]);
  const [healthIssues, setHealthIssues] = useState("");

  //model loading
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const imageRef = useRef();
  const fileInputRef = useRef();

  const [dietPlansName, setDietPlansName] = useState([]);
  const [dietPlansDescription, setDietPlansDescription] = useState([]);

  //use effect function to load the model when first rendering the web page
  useEffect(() => {
    loadModel();
    setPrediction([]);
    setImageURL(null);
    setNutrients([]);
    setHealthIssues("");
    setDietPlansName([]);
    setDietPlansDescription([]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchBuyHistory = async () => {
      try {
        const response = await fetch(`/buyHistory?UserID=${userID}`);
        let data = await response.json();
        console.log(typeof data);
        console.log(data);
        let foodArray = [];
        for (let index = 0; index < data.length; index++) {
          //let foodID = data[index].foodID;
          // foodIndexArray.push(foodID);
          await fetch(`/foods/${data[index].foodID}`).then(async (response) => {
            await response.json().then(async (foodInfo) => {
              foodArray.push(foodInfo);
            });
          });
        }

        setFoods(foodArray);
        console.log(foodArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBuyHistory();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     try {
  //       const response = await axios.get(`/users/${userID}`);
  //       setUser(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const calculateBMI = () => {
  //     let height = user.height / 100;
  //     let weight = user.weight;
  //     let bmiValue = weight / (height * height);
  //     bmiValue = bmiValue.toFixed(2);
  //     setBmi(bmiValue);

  //     if (bmiValue >= 18.0 && bmiValue <= 25.0) {
  //       setHealthStatus("Balanced Diet");

  //       const obeseDietPlan = dietPlans.filter(
  //         (plan) => plan.name === "Balanced Diet"
  //       )[0];
  //       console.log(obeseDietPlan.description);
  //       setDietPlansName(obeseDietPlan.name);
  //       setDietPlansDescription(obeseDietPlan.description);
  //     } else if (bmiValue > 25.0 && bmiValue < 30.0) {
  //       setHealthStatus("Over Weight");

  //       const obeseDietPlan = dietPlans.filter(
  //         (plan) => plan.name === "Weight Loss"
  //       )[0];
  //       console.log(obeseDietPlan.description);
  //       setDietPlansName(obeseDietPlan.name);
  //       setDietPlansDescription(obeseDietPlan.description);
  //     } else if (bmiValue >= 30.0) {
  //       setHealthStatus("Obesity");

  //       const obeseDietPlan = dietPlans.filter(
  //         (plan) => plan.name === "Obese"
  //       )[0];
  //       console.log(obeseDietPlan.description);
  //       setDietPlansName(obeseDietPlan.name);
  //       setDietPlansDescription(obeseDietPlan.description);
  //     }
  //   };
  //   getLoggedInUser();
  //   calculateBMI();
  // }, [user, userID]);

  //load model function
  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await tf.loadLayersModel(
        "https://raw.githubusercontent.com/Sathmikasenadheera01/mltesting/master/zodoofoodclassification_model_tfjs/model.json"
      );
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get(`/users/${userID}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLoggedInUser();
  }, [userID]);

  useEffect(() => {
    const calculateBMI = () => {
      let height = user.height / 100;
      let weight = user.weight;
      let bmiValue = weight / (height * height);
      bmiValue = bmiValue.toFixed(2);
      setBmi(bmiValue);

      if (bmiValue >= 18.0 && bmiValue <= 25.0) {
        setHealthStatus("Balanced Diet");

        const balancedDietPlan = dietPlans.find(
          (plan) => plan.name === "Balanced Diet"
        );
        console.log(balancedDietPlan.description);
        setDietPlansName(balancedDietPlan.name);
        setDietPlansDescription(balancedDietPlan.description);
      } else if (bmiValue > 25.0 && bmiValue < 30.0) {
        setHealthStatus("Over Weight");

        const overWeightDietPlan = dietPlans.find(
          (plan) => plan.name === "Weight Loss"
        );
        console.log(overWeightDietPlan.description);
        setDietPlansName(overWeightDietPlan.name);
        setDietPlansDescription(overWeightDietPlan.description);
      } else if (bmiValue >= 30.0) {
        setHealthStatus("Obesity");

        const obeseDietPlan = dietPlans.find((plan) => plan.name === "Obese");
        console.log(obeseDietPlan.description);
        setDietPlansName(obeseDietPlan.name);
        setDietPlansDescription(obeseDietPlan.description);
      }
    };
    calculateBMI();
  }, [user]);

  //upload image function
  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  //predict function
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
    console.log(predictions);
    if (Math.max(...predictions[0]) < 0.7) {
      setPrediction(
        "Zoodoo classification model cannot identify this image correctly! sorry!"
      );
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

  //api call to get nutrients
  const apiCall = async () => {
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

  //display health issues
  const showHealthIssues = () => {
    fetch(`/healthIssues/${prediction}`).then((response) => {
      response.json().then((healthIssuesSet) => {
        setHealthIssues(healthIssuesSet);
      });
    });
    console.log(healthIssues);
  };

  //main function
  const showNutritions = async () => {
    const image = await loadImage(imageURL);
    await predict(image);
    const data = await apiCall();
    const dataNutrients = await data.foods[0];
    setNutrients(dataNutrients);
    showHealthIssues();
  };

  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  if (!userID) {
    navigate("/LogIn");
  }

  return (
    <div className="">
      {/* user information div */}
      <div className="bg-secondaryGreen border border-primaryGreen rounded-md p-8 my-8 flex justify-between">
        {/* user info */}
        <div>
          <div className="flex">
            <h2 className="font-primary font-bold text-base">Name: &nbsp;</h2>
            <span className="text-gray-700 font-primary">
              {user.firstName + " " + user.lastName}
            </span>
          </div>
          <div className="flex mt-2">
            <h2 className="font-primary font-bold text-base">Age: &nbsp;</h2>
            <span className="text-gray-700 font-primary">
              {user.age} years old
            </span>
          </div>
          <div className="flex mt-2">
            <h2 className="font-primary font-bold text-base">Height: &nbsp;</h2>
            <span className="text-gray-700 font-primary">
              {user.height + "cm"}
            </span>
          </div>
          <div className="flex mt-2">
            <h2 className="font-primary font-bold text-base">Weight: &nbsp;</h2>
            <span className="text-gray-700 font-primary">
              {user.weight + "kg"}
            </span>
          </div>
        </div>

        {/* bmi div */}
        <div>
          <h4 className="font-primary text-gray-800 text-xl font-bold mb-3">
            Your BMI Value
          </h4>
          <p className="p-2 bg-primaryGreen text-white font-medium text-center font-primary rounded-md">
            {healthStatus}
          </p>
          <div className="p-4 bg-green-900 rounded-md text-white text-center mt-3">
            <p className="font-primary font-semibold text-lg">{bmi}</p>
          </div>
        </div>
      </div>

      <div className="bg-secondaryGreen w-full p-4 rounded-md mb-6 flex items-start justify-between">
        <div>
          <div>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              className="w-fit rounded-md border border-gray-400 px-2 py-2 outline-none font-primary"
              onChange={uploadImage}
              ref={fileInputRef}
            />
          </div>
          <div>
            {imageURL && (
              <button
                className="font-normal px-4 py-2 rounded-[5px] font-primary bg-primaryGreen text-white my-4"
                onClick={showNutritions}
              >
                Identify Image
              </button>
            )}
          </div>
          {/* prediction info div */}
          <div className="px-3 my-2 rounded-md border border-primaryGreen w-fit">
            {prediction.length > 0 ? (
              <div className="my-2 font-primary">{prediction}</div>
            ) : (
              <div className="my-2 font-primary">
                Zoodoo food classification model Identified food name will
                display here
              </div>
            )}
          </div>
          {/* nutrients details */}
          <div>
            <h1 className="font-bold text-gray-700 font-secondary text-xl">
              Nutritional Values of this food
            </h1>
            <div className="rounded-md p-3 font-primary">
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>
                  Serving Weight(g)/ quantity:{" "}
                  {nutrients ? nutrients.serving_weight_grams : "press button"}
                </span>
              </div>
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>
                  Number of Calories:
                  {nutrients ? nutrients.nf_calories : "press button"}
                </span>
              </div>
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>
                  Protein(g):{" "}
                  {nutrients ? nutrients.nf_protein : "press button"}
                </span>
              </div>
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>
                  carbohydrate(g):
                  {nutrients ? nutrients.nf_total_carbohydrate : "press button"}
                </span>
              </div>
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>
                  Total fat(g):
                  {nutrients ? nutrients.nf_total_fat : "press button"}
                </span>
              </div>
              <div className="font-primary font-medium bg-green-300 my-2 rounded-md px-2 py-1 w-fit">
                <span>sugar(g): {nutrients.nf_sugars}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-3 font-primary">
              If you continuosly eat foods like this, You may have;
            </p>
            <div className="bg-red-500 text-white font-primary rounded-md mt-3 p-3 w-fit">
              <p>
                {healthIssues
                  ? healthIssues[0].healthIssues
                  : "future health diseases will display here"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div>
            {imageURL && (
              <img
                src={imageURL}
                alt="Upload Preview"
                crossOrigin="anonymous"
                ref={imageRef}
                className="w-56"
              />
            )}
          </div>
        </div>
      </div>

      {/* diet plan */}
      <div className="my-3 p-3">
        <h1 className="font-secondary text-gray-600 font-bold text-2xl my-2">
          Suggested Diet Plan by Zoodo
        </h1>
        <h2 className="font-primary font-xl text-white font-semibold mb-2 bg-primaryGreen p-2 rounded-md w-fit">
          {dietPlansName}
        </h2>
        <p className="font-primary text-black">{dietPlansDescription}</p>
      </div>

      {/* food history */}
      <div className="mb-12">
        <h2 className="font-secondary text-lg text-primaryGreen mb-2 font-bold">
          Your Diet History
        </h2>

        {foods &&
          foods.map((food) => (
            <div className="bg-slate-100 p-3 rounded-md flex gap-3 mb-3">
              {/* food image */}
              <div>
                <img src={food.imageURL} alt="" className="w-24 rounded-md" />
              </div>
              {/* food name */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 font-primary">
                  {food.name}
                </h3>
                <p className="font-primary text-gray-800 text-[14px]">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sequi, sint.
                </p>
                {/* nutrition info */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1 items-center">
                    {/* <FaFire size={20} className="text-gray-800" /> */}
                    {/* <p className="font-primary text-gray-500">242 calories</p> */}
                  </div>

                  <div className="flex gap-1 items-center">
                    {/* <FaFire size={20} className="text-gray-800" /> */}
                    {/* <p className="font-primary text-gray-500">18g Fat</p> */}
                  </div>

                  <div className="flex gap-1 items-center">
                    {/* <FaFire size={20} className="text-gray-800" /> */}
                    {/* <p className="font-primary text-gray-500">3g Carbs</p> */}
                  </div>

                  <div className="flex gap-1 items-center">
                    {/* <FaFire size={20} className="text-gray-800" /> */}
                    {/* <p className="font-primary text-gray-500">16g Protein</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
