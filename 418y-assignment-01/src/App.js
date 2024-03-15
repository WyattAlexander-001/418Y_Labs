import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

//Style for while project:
import './App.css';
import CreateTeam from './CreateTeam';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login Here</Link>  
            </li>
            <li>
              <Link to="/signup">Signup Here</Link> 
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/createTeam" element={<CreateTeam />} /> 
          <Route path="/viewTeam" element={<Signup />} /> 
          <Route path="/ViewProject" element={<Signup />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
