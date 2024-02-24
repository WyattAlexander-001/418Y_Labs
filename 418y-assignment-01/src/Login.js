import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import './Login.css';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const loginValues = {
      username: userId,
      password: password
    };
    axios.get('http://localhost:9000/getUser', { params: loginValues })
      .then((res) => {
        if(res.data) {
          alert('Login Successful');
        } else {
          alert('YOU FAILED BRUH');
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert('Error in Login');
      });
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link> </p>
    </div>
  );
}

export default Login;
