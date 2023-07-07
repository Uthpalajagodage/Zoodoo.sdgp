import React, { useState } from 'react';
import axios from 'axios';
import "./Contactus.css";
import ContactImage from "../images/contact_image.jpg";

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

    const { name, email, phone, message } = data;
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(phone)) {
      errors.phone = "Phone number must contain only numbers";
      console.log("phone wrong")
    }
    

    if (Object.keys(errors).length === 0) {
      axios.post('http://192.168.1.3:3100/submit', { name, email, phone, message })
        .then(response => {
          console.log('Data inserted successfully');
          setData({ name: "", email: "", phone: "", message: "" });
          setErrors({});
        })
        .catch(error => {
          console.error('Error inserting data into the table: ' + error);
        });
    } else {
      setErrors(errors);
    }
  }

  return (
    <div className="contact-container">
      <form method='post' action='/submit' onSubmit={handleSubmit} className="contact-form">
        <h1>Contact <span>Us</span></h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={data.name}
          placeholder='Enter Name'
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error_message">{errors.name}</span>}
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={data.email}
          placeholder='example@gmail.com'
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error_message">{errors.email}</span>}
        <input
          type="tel"
          name="phone"
          onChange={handleChange}
          value={data.phone}
          placeholder='+94'
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="error_message">{errors.phone}</span>}
        <textarea
          name="message"
          onChange={handleChange}
          value={data.message}
          cols="30"
          rows="10"
          placeholder='type here...'
        />
        <button type='submit' className='bg-primaryGreen text-white'>Send</button>
      </form>
      <div className="contact-image-container">
        <img className="contact-image" src={ContactImage} alt="Contact" />
        <p className="contact-text">
          Filling out our contact form is the simplest and quickest way to reach ZOODO. Your message will be sent to the right team, and we'll get in touch with you right away.
        </p>
      </div>
    </div>
  );
}

export default Contactus;
