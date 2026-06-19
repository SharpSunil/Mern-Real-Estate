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

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property" element={<Property />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
