import {React,  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import { set } from 'mongoose';

function CreateProject() {
  const [proj_name, setProjectName] = useState('');
  const [proj_desc, setProjectDesc] = useState('');
  const [prod_owner_id, setProductOwnerId] = useState('');
  const [mgr_id, setManagerId] = useState('');
  const [team_id,  setTeamId] = useState('');
  const [users, setUsers] = useState([]);
  const [productOwners, setProductOwners] = useState([]); //iffy
  const [teams, setTeams] = useState([]); // State variable for teams

  

  const handleCreateProject = (event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id) => {
    event.preventDefault()
    axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
        .catch((err) => alert('Error in Creating project'))
}

// const handleCreateProject = (event) => {
//   event.preventDefault();
//   // Check if project with the same name already exists
//   axios.get(`http://localhost:9000/projects?name=${proj_name}`)
//     .then(response => {
//       if (response.data && response.data.length > 0) {
//         // Project with the same name exists
//         alert('A project with this name already exists. Please choose a different name.');
//       } else {
//         // No existing project with the same name, proceed to create
//         axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
//           .then(() => alert('Project created successfully'))
//           .catch((err) => alert('Error in Creating project'));
//       }
//     })
//     .catch((err) => {
//       console.error('Error checking existing projects', err);
//       alert('Error checking for existing projects');
//     });
// };

useEffect(() => {
  axios.get('http://localhost:9000/getUsers')
  .then(function (response) {
    setUsers(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  }, []);

  

  return (
    <div>
      <h2>CreateProject</h2>
      <form>
        <label>
            PROJECT NAME
          <input type="text" value={proj_name} onChange={e => setProjectName(e.target.value)} />
        </label>
        <br />
        <label>
            PROJECT DESCRIPTION
          <input type="text" value={proj_desc} onChange={e => setProjectDesc(e.target.value)} />
        </label>
        <br />
        <label>
            MANAGER ID: 

            <select onChange={(e) => setManagerId(e.target.value)} value={mgr_id}>
            <option value="">Select Manager</option>
            {users.map((user, index) => {
             return <option key={index} value={user._id}>   
                {user.firstName} {user.lastName}
            </option>
            })}
            </select>
        </label>
        <br />
        <br />
        <label>
          PRODUCT OWNER NAME: 
          <select onChange={(e) => setProductOwnerId(e.target.value)} value={prod_owner_id}>
            <option value="">Select Product Owner</option>
            {productOwners.map((owner, index) => {
              return <option key={index} value={owner._id}>
                {owner.firstName} {owner.lastName}
              </option>;
            })}
          </select>
        </label>
        <br />

        <br />
        <label>
          TEAM NAME: 
          <select onChange={(e) => setTeamId(e.target.value)} value={team_id}>
            <option value="">Select Team</option>
            {teams.map((team, index) => {
              return <option key={index} value={team._id}>
                {team.team_name}
              </option>;
            })}
          </select>
        </label>
        <br />
  
        <button type="button" onClick={(event) => handleCreateProject(event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id)}>
          Create Project!!!
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
