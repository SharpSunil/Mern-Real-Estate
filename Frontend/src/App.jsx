import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.scss"

import LandingPage from './Pages/shared/LandingPage'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import Property from './Pages/Property/Property'
import Properties from './Pages/Properties/Properties'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property" element={<Property />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
