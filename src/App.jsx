import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ComplaintsBook from "./pages/ComplaintsBook";
import Menu from "./pages/Menu";
import MissionAndVision from "./pages/MissionAndVision";
import ContactUs from "./pages/ContactUs";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/complaints" element={<ComplaintsBook />} />
          <Route path="/missionandvision" element={<MissionAndVision />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
