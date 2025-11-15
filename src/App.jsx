import React from "react";
import { useEffect, useState } from "react";
import { db } from "./FireBase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

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
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });
    return () => unsub();
  }, []);

  const handleadd = async (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      alert("Please enter a valid task.");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      text: trimmedText,
      createdAt: serverTimestamp(),
    });
    setText("");
  };
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
