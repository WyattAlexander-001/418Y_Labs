import {React,  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateTeam() {
  const [team_name, setTeamName] = useState('');

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/createTeam', { team_name });
      alert('Team created successfully');
      //setTeamName(''); // Reset the input after successful submission
    } catch (error) {
      alert('Failed to create team');
      console.error(error);
    }
  };


  return (
    <div>
      <h2>Create Team</h2>
      <form onSubmit={handleCreateTeam}>
        <label>
          Team Name:
          <input
            type="text"
            value={team_name}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
}

export default CreateTeam;
