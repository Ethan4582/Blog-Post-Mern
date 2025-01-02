import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";
import ReadBlog from "../pages/ReadBlog";
import Profile from "../pages/Profile";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} /> 
        {/* Redirect root to /landing */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/read" element={<ReadBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> 
        {/* Fallback for undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
