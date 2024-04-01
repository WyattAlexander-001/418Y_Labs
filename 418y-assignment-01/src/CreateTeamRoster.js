import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateTeamRoster() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/getTeams')
    .then(function (response) {
      setTeams(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
    //axios.get('http://localhost:9000//getUsers').then((res) => setUsers(res.data));
    axios.get('http://localhost:9000/getUsers')
    .then(function (response) {
      setUsers(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  const teamOptions = teams.map((team) => ({ label: team.team_name, value: team._id }));
  const userOptions = users.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user._id }));

  const handleSubmit = () => {
    axios.post('http://localhost:9000/addMembersToTeam', { team_id: selectedTeam, member_ids: selectedUsers.map(u => u.value) })
      .then(() => alert('Members added successfully'))
      .catch((err) => alert('Error adding members to team'));
  };

  return (
    <div>
      <h2>Create Team Roster</h2>
      <h3>Select Team</h3>
      <Select
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option.value)}
      />
      <h3>Select Members</h3>
      <Select
        isMulti
        value={selectedUsers}
        options={userOptions}
        onChange={setSelectedUsers}
      />
      <button onClick={handleSubmit}>Add Members</button>
    </div>
  );
}

export default CreateTeamRoster;
