import React, { useState } from 'react';
import "./Contactus.css";

const Contactus = () => {
    const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone } = data;
        const errors = {};

        // Validate name field
        if (!name.trim()) {
            errors.name = "Name is required";
        }

        // Validate email field
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email format";
        }

        // Validate phone number field
        if (!phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(phone)) {
            errors.phone = "Phone number must contain only numbers";
        }

        if (Object.keys(errors).length === 0) {
            // Form is valid, submit the data or save to the database
            console.log(data);
            // You can make an API call or save the data to your local SQL database here
        } else {
            // Set the errors object and prevent form submission
            setErrors(errors);
        }
    }

    return (
        <form method='post' onSubmit={handleSubmit}>
            <h1>Contact <span>Us</span></h1>
            <input
                type="text"
                name="name"
                onChange={handleChange}
                value={data.name}
                placeholder='Enter Name'
                className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder='example@gmail.com'
                className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <input
                type="tel"
                name="phone"
                onChange={handleChange}
                value={data.phone}
                placeholder='+94'
                className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
            <textarea
                name="message"
                onChange={handleChange}
                value={data.message}
                cols="30"
                rows="10"
                placeholder='type here...'
            />
            <button type='submit'>Send</button>
            <p>{data.name}, {data.email}, {data.phone}, {data.message}</p>
        </form>
    );
}

export default Contactus;
