import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function ViewRoster() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (selectedTeam) {
      axios.get(`http://localhost:9000/getTeamMembers/${selectedTeam}`)
        .then(async (res) => {
          const memberDetailsPromises = res.data.map(memberId =>
            axios.get(`http://localhost:9000/getMemberDetails/${memberId}`)
          );
          const memberDetailsResponses = await Promise.all(memberDetailsPromises);
          const memberDetails = memberDetailsResponses.map(response => response.data);
          setTeamMembers(memberDetails);
        })
        .catch((err) => console.error("Error fetching team members: ", err));
    }
  }, [selectedTeam]);

  const teamOptions = teams.map((team) => ({ label: team.team_name, value: team._id }));

  return (
    <div>
      <h2>View Team Roster</h2>
      <Select
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option.value)}
        placeholder="Select a Team"
      />
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index}>{member.firstName} {member.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRoster;
