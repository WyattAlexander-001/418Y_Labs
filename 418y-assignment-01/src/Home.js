import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios


const Home = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser')
    const handleSignOut = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate("/Login");
      }

    return (
      //This code is from Lab 4 imp guide
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page!</p>


            <>
                { loggedInUser != null &&
                   <p> {"Welcome! " + loggedInUser}</p> 
                }
                </>
              
              <>
                { loggedInUser != null &&
                    <button type="button" onClick={(event) => {
                    handleSignOut(event)
                }}>Sign Out</button>
                }
                </>
                <>
                { loggedInUser == null &&
                    <p className="text-center">
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                }
                </>

        </div>
    )
}

export default Home



