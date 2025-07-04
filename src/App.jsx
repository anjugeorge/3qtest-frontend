import React, { useEffect, useState } from "react";
import Navbar from "./components/pages/Navbar/Navbar";
import Footer from "./components/pages/Footer/Footer";
import Landing from "./components/pages/Landing/Landing";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AboutUsPage from "./components/pages/AboutUs/AboutUsPage";
import Test from "./components/pages/Landing/Test";
import TestPage from "./components/pages/Test/TestPage";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import PersonalityAssessment from "./components/pages/Assessment/PersonalityAssessment";
import Result from "./components/pages/Assessment/Result";
import CareerAssessment from "./components/pages/Assessment/CareerAssessment";
import Success from "./components/pages/Assessment/Success";
import { AuthProvider } from "./context/AuthContext";
const AppContent = () => {
  return (
    <>
      <AuthProvider>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
          <Route
            path="/personality-assessment"
            element={<PersonalityAssessment />}
          ></Route>
          <Route
            path="/career-assessment"
            element={<CareerAssessment />}
          ></Route>
          <Route path="/results" element={<Result />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
