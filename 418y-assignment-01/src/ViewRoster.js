import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewRoster() {
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
      <table className="team-table">
        <thead>
          <tr>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRoster;
