import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateUserStory() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(''); // null indicates no project is selected initially
  const [userStory, setUserStory] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/getProjectsForUserStory')
      .then((res) => {
        console.log('Projects fetched:', res.data); // Log the response data
        setProjects(res.data); 
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const projectOptions = projects.map((project) => ({
    label: project.project_name, 
    value: project._id 
  }));
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Selected Project at submission:", selectedProject);

    const submissionPriority = priority ? parseInt(priority, 10) : 0; // Use 0 as default if priority is not set
    axios.post('http://localhost:9000/createUserStory', { user_story: userStory, proj_id: selectedProject, priority: submissionPriority })
      .then(() => {
        alert('User story added successfully');
      })
      .catch((err) => alert('Error adding user story'));
  };

  return (
    <div>
      <h2>Create User Story</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
            <option value="">Select Project To Create User Story</option>
            {projects.map((project, index) => {
              return <option key={index} value={project._id}>
                {project.proj_name}
              </option>;
            })}
          </select>

        </div>
        <div>
          <textarea
            placeholder="User Story Description"
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            rows="4" // Sets the height of the textarea
          />
        </div>
        <div>
        <input
            type="number"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)} // Correctly update the priority state
            min="0" // Ensures priority is not negative
        />
        </div>
        <button type="submit">Add User Story!!!</button>
      </form>
    </div>
  );
}

export default CreateUserStory;
