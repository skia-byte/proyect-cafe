import React from "react";
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
import EmployeeSkillsManager from "./pages/EmployeeSkillsManager";
import Team from "./pages/Team";
import Publicity from "./pages/Publicity";
import CoffeeMenuPage from "./pages/CoffeeMenuPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

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
            <Route path="/login-form" element={<LoginForm />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route
              path="/dashboard/employee-skills"
              element={<EmployeeSkillsManager />}
            />
            <Route path="/dashboard/team" element={<Team />} />
            <Route path="/publicity" element={<Publicity />} />
            <Route path="/coffee-menu" element={<CoffeeMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
