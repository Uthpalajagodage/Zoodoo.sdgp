import React from 'react'
import "./Contactus.css"
import { useState } from 'react'

const Contactus = () => {
    const[data,setData]=useState({name:"",email:"",phone:"",message:""});
    const handleChange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(data);
    }
  return (
    <form method='post' onSubmit={handleSubmit}>
        <h1>Contact <span>Us</span></h1>
        <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder='Enter Name'/>
        <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder='example@gmail.com' />
        <input type="phone" name="phone" id="" onChange={handleChange} value={data.phone} placeholder='+94'/>
        <textarea name="message" id="" onChange={handleChange} value={data.message} cols="30" rows="10" placeholder='type here...'/>
        <button type='submit'>send</button>
        <p>{data.name},{data.email},{data.phone},{data.message}</p>    

    </form>
  )
}

export default Contactus