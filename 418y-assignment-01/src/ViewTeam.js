import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewTeams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getTeams');
        setTeams(response.data);
      } catch (error) {
        alert('Failed to fetch teams');
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team.team_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTeams;
