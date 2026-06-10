import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import "./App.scss"

import LandingPage from './Pages/shared/LandingPage'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
