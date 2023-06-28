import React from "react";
import { useState } from "react";
import signupImg from "../images/signup.jpg";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        age,
        height,
        weight,
        createPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.status === 400) {
      setError(data.message);
    } else {
      setError("");
      setSuccess(data.message);
    }

    if (data.message === `${firstName} ${lastName} successfully signed up`) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");
      setHeight("");
      setWeight("");
      setCreatePassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      {/* <div className="px-4 md:px-12 lg:px-36 max-w-screen-xl 2xl:px-0 mx-auto"> */}
      {/* main div */}
      <div className="flex-row lg:flex justify-center mt-12 mb-24">
        <div className="basis-1/3 flex-1">
          <img
            src={signupImg}
            alt="food dish"
            className="rounded-l-lg h-full w-full object-cover object-center hidden lg:block"
          />
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="basis-2/3 px-10 py-8 flex-1">
            {/* heading row */}
            <div>
              <h2 className="font-secondary font-bold text-2xl text-center lg:text-left">
                Create an Account
              </h2>
              <p className="font-primary text-[16px] text-center lg:text-left">
                Already have an Account?{" "}
                <Link to="../LogIn">
                  <span className="font-primary text-primaryGreen">Log In</span>
                </Link>
              </p>
            </div>

            {/* form name row*/}
            <div className="flex-row lg:flex gap-5 items-center mt-2 lg:mt-5">
              <input
                type="text"
                className="textBox"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="textBox mt-2 lg:mt-0"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mt-2 lg:mt-5">
              <input
                type="email"
                className="textBox"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-row lg:flex gap-5 items-center mt-2 lg:mt-5">
              <input
                type="number"
                className="textBox"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="number"
                className="textBox mt-2 lg:mt-0"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <input
                type="number"
                className="textBox mt-2 lg:mt-0"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex-row lg:flex gap-5 items-center mt-2 lg:mt-5">
              <input
                type="password"
                className="textBox"
                placeholder="Create Password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
              />
              <input
                type="password"
                className="textBox mt-2 lg:mt-0"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* checkbox */}
            <div className="my-5">
              <div>
                <input type="checkbox" />
                <span className="ml-3 font-primary">
                  I would like to receive marketing e-mails from zoodoo
                </span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ml-3 font-primary">
                  By Signing up, I agree to the
                  <span className="font-primary text-primaryGreen">
                    &nbsp; privacy policy &nbsp;
                  </span>
                  and
                  <span className="font-primary text-primaryGreen">
                    &nbsp; terms of service &nbsp;
                  </span>
                </span>
              </div>
            </div>

            <Button
              text="Create New Account"
              bgColor="bg-primaryGreen"
              textColor="text-white"
            />

            {error && (
              <div className="bg-red-300 border border-red-700 rounded-md px-2 py-1 text-balck font-primary w-fit mt-2">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-300 border border-green-700 rounded-md px-2 py-1 text-balck font-primary w-auto mt-2">
                {success}
              </div>
            )}
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;
