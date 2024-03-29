import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateTeamRoster() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('/getTeams').then((res) => setTeams(res.data));
    axios.get('/getUsers').then((res) => setUsers(res.data));
  }, []);

  const teamOptions = teams.map((team) => ({ label: team.team_name, value: team._id }));
  const userOptions = users.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user._id }));

  const handleSubmit = () => {
    axios.post('/addMembersToTeam', { team_id: selectedTeam, member_ids: selectedUsers.map(u => u.value) })
      .then(() => alert('Members added successfully'))
      .catch((err) => alert('Error adding members to team'));
  };

  return (
    <div>
      <Select
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option.value)}
      />
      <Select
        isMulti
        options={userOptions}
        onChange={setSelectedUsers}
      />
      <button onClick={handleSubmit}>Add Members</button>
    </div>
  );
}

export default CreateTeamRoster;
