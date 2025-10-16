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
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/complaints" element={<ComplaintsBook />} />
            <Route path="/mission-vision" element={<MissionAndVision />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
