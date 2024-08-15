import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import Shemsia from "./pages/Shemsia";
import Upload from "./pages/Upload";
import Header from "./Header";
import PrivateRoutes from "./PrivateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shemsia" element={<Shemsia />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />

        {/* Protected routes */}
        <Route element={<PrivateRoutes adminOnly={true} />}>
          <Route path="/upload" element={<Upload />} />
        </Route>

        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
