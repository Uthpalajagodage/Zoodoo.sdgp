import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/Contactus";
import FoodRecipeSearch from "./pages/FoodRecipeSearch";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <div className="px-4 md:px-12 lg:px-36 max-w-screen-xl 2xl:px-0 mx-auto min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<ContactUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/foodRecipeSearch" element={<FoodRecipeSearch />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
