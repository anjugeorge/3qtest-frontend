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
import Assessment from "./components/pages/Assessment/Assessment";
import Login from "./components/pages/UserAuth/Login";
import PersonalityAssessment from "./components/pages/Assessment/PersonalityAssessment";
import Result from "./components/pages/Assessment/Result";
import CareerAssessment from "./components/pages/Assessment/CareerAssessment";
import Payment from "./components/pages/UserAuth/Payment";
import Success from "./components/pages/Assessment/Success";

const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Landing}></Route>
        <Route exact path="/about-us" Component={AboutUsPage}></Route>
        <Route exact path="/test" Component={TestPage}></Route>
        <Route
          exact
          path="/personality-assessment"
          Component={PersonalityAssessment}
        ></Route>
        <Route
          exact
          path="/career-assessment"
          Component={CareerAssessment}
        ></Route>
        <Route exact path="/results" Component={Result}></Route>
        <Route exact path="/payment" Component={Payment}></Route>
        <Route exact path="/success" Component={Success}></Route>
      </Routes>
      <Footer />
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
