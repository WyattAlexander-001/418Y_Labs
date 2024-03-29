import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';




function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    axios.get('http://localhost:9000/getUser', {
      params: { 
        username: username, // Use the state variable directly
        password: password
      }
    })
    .then((res) => {
      if (res.data.user) { // If login is successful
        alert('Login Successful');
        localStorage.clear();
        localStorage.setItem('loggedInUser', res.data.user._id); // Save user ID to localStorage
        navigate("/Home"); // Navigate to Home page
      } else {
        alert('Wrong Credentials');
      }
    })
    .catch((err) => {
      console.error(err); // Log any error for debugging
      alert('Error in Login');
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username: {/* Updated label */}
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
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
