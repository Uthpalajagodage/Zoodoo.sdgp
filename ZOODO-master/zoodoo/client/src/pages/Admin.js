import React from "react";
import { useState } from "react";
import Button from "../components/Button";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  //health issues
  const [foodName, setFoodName] = useState("");
  const [healthIssues, setHealthIssues] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/foods/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        imageURL,
      }),
    });

    const data = await response.json();
    alert(`food item added successfully ${data.name}`);

    setName("");
    setPrice("");
    setDescription("");
    setImageURL("");
  };

  const handleSubmitHealthIssues = async (e) => {
    e.preventDefault();

    const response = await fetch("/healthIssues/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName,
        healthIssues,
      }),
    });

    const data = await response.json();
    console.log(data);
    alert(`Health issues added successfully`);

    setFoodName("");
    setHealthIssues("");
  };

  return (
    <div>
      {/* form */}
      <section className="flex items-start py-4 px-12 bg-slate-200 gap-10 mb-12">
        <div className="bg-white rounded-md p-12 shadow-md w-6/12 mx-auto my-12">
          <form onSubmit={handleSubmit}>
            <h4 className="font-secondary text-primaryGreen text-2xl font-bold">
              Add a new Food
            </h4>
            {/* input row */}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="textBox"
                placeholder="name of the food"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name">Price</label>
              <input
                type="text"
                className="textBox"
                placeholder="price of the food"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name">Description</label>
              <textarea
                className="textBox"
                placeholder="small description"
                cols="10"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="name">image URL</label>
              <input
                type="text"
                className="textBox"
                placeholder="image URL of the food"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>

            <Button
              text="Add Food"
              bgColor="bg-primaryGreen"
              textColor="text-white"
            />
          </form>
        </div>

        {/* health report */}
        <div className="bg-white rounded-md p-12 shadow-md w-6/12 mx-auto my-12">
          <form onSubmit={handleSubmitHealthIssues}>
            <h4 className="font-secondary text-primaryGreen text-2xl font-bold">
              Add Health Issues
            </h4>
            {/* input row */}
            <div>
              <label htmlFor="name" className="font-primary">
                Food Name
              </label>
              <input
                type="text"
                className="textBox"
                placeholder="name of the food"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label htmlFor="name" className="font-primary">
                Possible Future Health Issues
              </label>
              <textarea
                cols="30"
                rows="10"
                className="textBox"
                placeholder="Possible Future Health Issues"
                value={healthIssues}
                onChange={(e) => setHealthIssues(e.target.value)}
              ></textarea>
            </div>

            <Button
              text="Add Health Issue"
              bgColor="bg-primaryGreen"
              textColor="text-white"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Admin;
