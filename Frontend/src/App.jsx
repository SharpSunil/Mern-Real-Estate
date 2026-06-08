import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import "./App.scss"
import Home from './Pages/Home/Home'

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   
  )
}

export default App
