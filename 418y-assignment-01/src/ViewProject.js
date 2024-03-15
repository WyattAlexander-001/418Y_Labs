import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Product Owner</th>
            <th>Manager</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.project_name}</td>
              <td>{project. description}</td>
              <td>{project.owner_details}</td> 
              <td>{project.manager_details}</td>
              <td>{project.team_details}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProject;
