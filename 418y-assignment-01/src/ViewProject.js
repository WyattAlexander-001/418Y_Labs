import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProjects() {
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
              <td>{project.proj_name}</td>
              <td>{project.proj_desc}</td>
              <td>{project.prod_owner_id}</td> {/* Adjust these fields based on your actual data structure */}
              <td>{project.mgr_id}</td>
              <td>{project.team_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProjects;
