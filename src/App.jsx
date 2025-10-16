import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ComplaintsBook from "./pages/ComplaintsBook";
import Menu from "./pages/Menu";
import MissionAndVision from "./pages/MissionAndVision";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/complaints" element={<ComplaintsBook />} />
            <Route path="/mission-vision" element={<MissionAndVision />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
