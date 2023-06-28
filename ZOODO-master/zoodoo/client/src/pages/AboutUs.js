import React from "react";
import "./about_us.css";
import St1 from "../images/student1.jpg";
import St2 from "../images/student2.jpg";
import St3 from "../images/student3.jpg";
import St4 from "../images/student4.jpg";
import St5 from "../images/student5.jpg";

function AboutUs() {
  return (
    <div className="icon" align="center">
      <h1 id="studentHeading">About Us</h1>
      <p>
        This project is regarding the implementation and design of Zoodoo,an
        advanced food ordering application. The goal of the Zoodoo project is to
        combine safer and healthier eating with food ordering applications in
        order to inform people about the health risks associated with various
        food types and to offer healthier substitutes so that they can live as
        healthy a life as possible.
      </p>
      <h2>Our Team</h2>
      <div id="students">
        <div className="studentBox">
          <div className="imgArea">
            <img className="studentPhoto" src={St1} alt="Diadri" />
            <div className="studentLayer">
              <p className="studentDesc">Diadri Weerasekara</p>
              <p className="studentDesc">w1867123</p>
              <p className="studentDesc">20210381</p>
            </div>
          </div>
        </div>
        <div className="studentBox">
          <div className="imgArea">
            <img className="studentPhoto" src={St2} alt="Chamindu" />
            <div className="studentLayer">
              <p className="studentDesc">Chamindu Moramudali</p>
              <p className="studentDesc">w1870554</p>
              <p className="studentDesc">20210091</p>
            </div>
          </div>
        </div>
        <div className="studentBox">
          <div className="imgArea">
            <img className="studentPhoto" src={St3} alt="Sathmika" />
            <div className="studentLayer">
              <p className="studentDesc">Kulunu Sathmika</p>
              <p className="studentDesc">w1867671</p>
              <p className="studentDesc">20210786</p>
            </div>
          </div>
        </div>
      </div>
      <div id="students2">
        <div className="studentBox">
          <div className="imgArea">
            <img className="studentPhoto" src={St4} alt="Uthpala" />
            <div className="studentLayer">
              <p className="studentDesc">Uthpala Jagodage</p>
              <p className="studentDesc">w1867446</p>
              <p className="studentDesc">20210347</p>
            </div>
          </div>
        </div>
        <div className="studentBox">
          <div className="imgArea">
            <img className="studentPhoto" src={St5} alt="Akshyani" />
            <div className="studentLayer">
              <p className="studentDesc">Shatheesh Akshyani</p>
              <p className="studentDesc">w1870582</p>
              <p className="studentDesc">20211532</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
