import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';

import ViewTeam from './ViewTeam'; // Assuming this component exists
import ViewProject from './ViewProject';

import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>        
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/createTeam" element={<CreateTeam />} /> 
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/viewTeam" element={<ViewTeam />} /> 
          <Route path="/ViewProject" element={<ViewProject />} /> 
          <Route path="/Users" element={<Users />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;






