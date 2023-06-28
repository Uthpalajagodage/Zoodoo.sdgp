import { useState } from "react";
import dietPlans from "./dietPlans"; 

const DietPlan = ({ healthStatus }) => {
  const dietPlan = dietPlans.find((plan) => plan.name === healthStatus);

  return (
    <div className="diet-plan">
      <h2>{dietPlan.name} Plan</h2>
      <p>{dietPlan.description}</p>
      <ul>
        {dietPlan.foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [bmi, setBmi] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  const calculateBMI = () => {
    let height = user.height / 100;
    let weight = user.weight;
    let bmiValue = weight / (height * height);
    bmiValue = bmiValue.toFixed(2);
    setBmi(bmiValue);

    if (bmiValue >= 18.0 && bmiValue <= 25.0) {
      setHealthStatus("Balanced Diet");
    } else if (bmiValue > 25.0 && bmiValue < 30.0) {
      setHealthStatus("Over Weight");
    } else if (bmiValue >= 30.0) {
      setHealthStatus("Obesity");
    }
  };

  return (
    <div>
      {/*existing code for calculating BMI */}
      {/* ... */}

      {/* render the diet plan based on the health status */}
      {healthStatus && <DietPlan healthStatus={healthStatus} />}

      {/* CSS styling for the DietPlan component */}
      <style jsx>{`
        .diet-plan {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        p {
          font-size: 16px;
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          font-size: 14px;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};
