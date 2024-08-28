import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import Shemsia from "./pages/Shemsia";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";
import Information from "./pages/Information";
import AddPhoto from "./pages/AddPhoto";
import Header from "./Header";
import PrivateRoutes from "./PrivateRoutes";
import Footer from "./Footer";


const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shemsia" element={<Shemsia />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/information/:_id" element={<Information />} />
        

        /* Protected routes */
        <Route element={<PrivateRoutes adminOnly={true} />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:_id" element={<Edit />} />
          <Route path="/edit/:_id/add-photo" element={<AddPhoto />} />

        </Route>

        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;