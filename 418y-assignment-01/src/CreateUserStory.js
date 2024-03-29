import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateUserStory() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [userStory, setUserStory] = useState('');
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    axios.get('/getProjects').then((res) => setProjects(res.data));
  }, []);

  const projectOptions = projects.map((project) => ({ label: project.proj_name, value: project._id }));

  const handleSubmit = () => {
    axios.post('/createUserStory', { user_story: userStory, proj_id: selectedProject, priority })
      .then(() => alert('User story added successfully'))
      .catch((err) => alert('Error adding user story'));
  };

  return (
    <div>
      <Select
        options={projectOptions}
        onChange={(option) => setSelectedProject(option.value)}
      />
      <textarea
        placeholder="User Story Description"
        value={userStory}
        onChange={(e) => setUserStory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(parseInt(e.target.value))}
      />
      <button onClick={handleSubmit}>Add User Story</button>
    </div>
  );
}

export default CreateUserStory;
