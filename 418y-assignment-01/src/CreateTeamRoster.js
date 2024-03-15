import {React,  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { set } from 'mongoose';
import Select from 'react-select';


function CreateTeamRoster() {
  const [proj_name, setProjectName] = useState('');
  const [proj_desc, setProjectDesc] = useState('');
  const [prod_owner_id, setProductOwnerId] = useState('');
  const [mgr_id, setManagerId] = useState('');
  const [team_id,  setTeamId] = useState('');
  const [users, setUsers] = useState([]);
  const [productOwners, setProductOwners] = useState([]); //iffy
  const [teams, setTeams] = useState([]); // State variable for teams

  

  const handleCreateRoster = (event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id) => {
    event.preventDefault()
    axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
        .catch((err) => alert('Error in Creating project'))
}

useEffect(()=>{
	axios.get('/getUsers').then((res)=>setUsers(res.data))
	axios.get('/getTeams').then((res)=>setTeams(res.data))
})

const userOptions = users.map((user) => {
return {label: user.firstName + user.lastName, value: user._id}
})

const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <div>
        <select>
            {/* {teams.map((team) => <option value = {team._id}>{team.team_name}</option>} */}
        </select>
        <Select
            isMulti 
            value={selectedUsers}
            onChange={setSelectedUsers}
            options={userOptions}
        />
    </div>
  );
}

export default CreateTeamRoster;
