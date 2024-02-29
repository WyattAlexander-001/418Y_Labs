import {React,  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import './Signup.css'; 
import { set } from 'mongoose';

function Signup() {
  const [proj_name, setProjectName] = useState('');
  const [proj_desc, setProjectDesc] = useState('');
  const [prod_owner_id, setProductOwnerId] = useState('');
  const [mgr_id, setManagerId] = useState('');
  const [team_id,  setTeamId] = useState('');
  const [users, setUsers] = useState([]);

  const handleCreateProject = (event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id) => {
    event.preventDefault()
    axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
        .catch((err) => alert('Error in Creating project'))
}

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
      <h2>Signup</h2>
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
            PRODUCT OWNER ID
          <input type="text" value={prod_owner_id} onChange={e => setProductOwnerId(e.target.value)} />
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
            })
            }
            </select>
        </label>
        <br />
        <label>
            TEAM ID
          <input type="text" value={team_id} onChange={e => setTeamId(e.target.value)} />
        </label>
        <button type="button" onClick={(event) => handleCreateProject(event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id)}>
          Create Project!!!
        </button>
      </form>
    </div>
  );
}

export default Signup;
