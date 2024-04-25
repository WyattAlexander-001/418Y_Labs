import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';

import ViewTeam from './ViewTeam'; // Assuming this component exists
import ViewProject from './ViewProject';

import Navbar from './Navbar';
import Home from './Home';
import CreateTeamRoster from './CreateTeamRoster';
import ViewRoster from './ViewRoster';

import CreateUserStory from './CreateUserStory';
import ViewUserStory from './ViewUserStory';

import AssignUserStories from './AssignUserStories';
import EditUserStories from './EditUserStories';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>        
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/Home" element={<Home />} />
          

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/Users" element={<Users />} /> 

          <Route path="/createTeam" element={<CreateTeam />} /> 
          <Route path="/viewTeam" element={<ViewTeam />} /> 

          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/ViewProject" element={<ViewProject />} /> 

          <Route path="/createTeamRoster" element={<CreateTeamRoster />} /> 
          <Route path="/viewRoster" element={<ViewRoster />} />

          <Route path="assignUserStory" element={<AssignUserStories />} />
          <Route path="editUserStory" element={<EditUserStories />} />
          <Route path="createUserStory" element={<CreateUserStory />} />
          <Route path="viewUserStory" element={<ViewUserStory />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;






