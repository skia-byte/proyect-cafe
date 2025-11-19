import React from "react";
import { useEffect, useState } from "react";
import { db } from "./FireBase/firebase";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ComplaintsBook from "./pages/ComplaintsBook";
import Menu from "./pages/Menu";
import MissionAndVision from "./pages/MissionAndVision";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import LoginForm from "./pages/LoginForm";
import Products from "./pages/Products";
import MyProfile from "./pages/MyProfile";
import Skills from "./pages/Skills";
import Team from "./pages/Team";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/myprofile" element={<MyProfile />} />
            <Route path="/dashboard/skills" element={<Skills />} />
            <Route path="/dashboard/team" element={<Team />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
