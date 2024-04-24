import {React,  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import { set } from 'mongoose';

function ViewProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getProjects');
        setProjects(response.data);
      } catch (error) {
        alert('Failed to fetch projects');
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <table className="team-table">
        <thead>
          <tr>
            <th>Project Name: </th>
            <th>Description: </th>
            <th>Product Owner: </th>
            <th>Manager: </th>
            <th>Team: </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.project_name}</td> 
              <td>{project.description}</td>
              <td>{project.owner_details.firstName}</td> 
              <td>{project.manager_details.firstName}</td>
              <td>{project.team_details.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProject;
