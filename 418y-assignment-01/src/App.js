import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';

//Style for while project:
import './App.css';

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
          <Route path="/Users" element={<Users />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
