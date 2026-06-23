import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Properties from "../Pages/Properties/Properties";
import Property from "../Pages/Property/Property";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import VerifyEmail from "../Pages/Emailverify/VerifyEmail";
import ForgotPassword from "../Pages/Forgot-Password/ForgotPassword";



const SharedRoutes = () => {
  return (
    <>
    <Routes>
      <Route index element={<LandingPage />} />

      <Route
        path="properties"
        element={<Properties />}
      />

      <Route
        path="property/:id"
        element={<Property />}
      />

      <Route
        path="login"
        element={<Login />}
      />

      <Route
        path="register"
        element={<Register />}
      />

      <Route
        path="verifyemail"
        element={<VerifyEmail />}
      />

      <Route
        path="forgot-password"
        element={<ForgotPassword />}
      />
      </Routes>
    </>
  );
};

export default SharedRoutes;