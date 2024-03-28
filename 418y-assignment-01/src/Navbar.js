import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/createTeam">Create Team</Link></li>
          <li><Link to="/ViewTeam"> View Team</Link></li>
          <li><Link to="/createProject">Create Project</Link></li>
          <li><Link to="/ViewProject">View Projects</Link></li>

          <li><Link to="/createTeamRoster">Create Team Roster</Link></li>
          <li><Link to="/viewRoster">View Team Roster</Link></li>
          <li><Link to="/createUserStory">Create User Story</Link></li>
          <li><Link to="/viewUserStory">View User Story</Link></li>
        </ul>
      </nav>
    );
  }
  

export default Navbar;
