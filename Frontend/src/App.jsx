import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.scss"

import LandingPage from './Pages/shared/LandingPage'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import Property from './Pages/Property/Property'
import Properties from './Pages/Properties/Properties'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ForgotPassword from './Pages/Forgot-Password/ForgotPassword'
import VerifyEmail from './Pages/Emailverify/VerifyEmail'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/properties" element={<Properties />} />

        <Route path="/property/:id" element={<Property />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verifyemail" element={<VerifyEmail />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
