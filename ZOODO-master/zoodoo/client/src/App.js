import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import BuyFood from "./pages/BuyFood";
import AboutUs from "./pages/AboutUs"

function App() {
  return (
    <Router>
      <div>
        <div className="px-4 md:px-12 lg:px-36 max-w-screen-xl 2xl:px-0 mx-auto min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/buyFood/:id" element={<BuyFood />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
          {/* footer */}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
