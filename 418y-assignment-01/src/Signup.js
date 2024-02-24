import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import './Signup.css'; //This will make whole page red since it's still within the main App.css

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    const signupValues = {
      f_name: firstName,
      l_name: lastName,
      username: userId,
      password: password
    };
    axios.post('http://localhost:9000/createUser', signupValues)
      .then((res) => {
        alert('Signup successful!');
        // You can add code here to redirect or clear the form if you wish
      })
      .catch((err) => {
        console.error('Signup error:', err);
        alert('Error in Signing Up');
      });
  };
  
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignUp}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
