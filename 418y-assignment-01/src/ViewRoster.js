import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function ViewRoster() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // Use null for initial state to clearly indicate no team selected
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch teams on component mount
  useEffect(() => {
    axios.get('http://localhost:9000/getTeams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => console.error("Error fetching teams:", error));
  }, []);

  // Fetch team members when a team is selected
  useEffect(() => {
    if (selectedTeam) {
      axios.get(`http://localhost:9000/getTeamMembers/${selectedTeam}`)
        .then(response => {
          // Check if the response data is null or an empty array
          if (response.data && response.data.length > 0) {
            setTeamMembers(response.data); // Set the fetched team members
          } else {
            setTeamMembers([]); // Clear the team members if none are found
          }
        })
        .catch(err => {
          console.error("Error fetching team members:", err);
          setTeamMembers([]); // Also clear the team members in case of an error
        });
    } else {
      setTeamMembers([]); // Clear the team members if no team is selected
    }
  }, [selectedTeam]); // Re-fetch when selectedTeam changes
  

  const teamOptions = teams.map(team => ({ label: team.team_name, value: team._id }));

  return (
    <div>
      <h2>View Team Roster</h2>
      <Select
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option ? option.value : null)}
        placeholder="Select a Team"
        value={teamOptions.find(option => option.value === selectedTeam)} // Ensure the selected option is correctly displayed
      />
      {teamMembers.length > 0 ? (
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member.firstName} {member.lastName}</li>
          ))}
        </ul>
      ) : (
        <p>No team members to display</p> // Display a message when there are no team members
      )}
    </div>
  );
}

export default ViewRoster;
