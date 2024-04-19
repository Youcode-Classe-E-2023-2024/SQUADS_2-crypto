import React from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import Markets from './pages/Markets';
import Assets from './pages/Assets';
import Exchanges from './pages/Exchanges';
import NavBar from './components/navBar';

function App() {
  return (
    <div >
        <NavBar />

        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path='/Assets' element={<Assets />} />
          <Route path='/Exchanges' element={<Exchanges />} />
        </Routes>
  
      </div>
  );
}

export default App;
