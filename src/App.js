import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';  
import ManageCourses from './components/ManageCourses';  
import Login from './components/Login'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<ManageCourses />} />
      </Routes>
    </Router>
  );
}

export default App;