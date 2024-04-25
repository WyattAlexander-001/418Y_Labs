import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userStories, setUserStories] = useState([]);
    const userId = localStorage.getItem('loggedInUser');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:9000/getUserById/${userId}`)
                .then(response => {
                    setUserName(`${response.data.firstName} ${response.data.lastName}`);
                    // Fetch user stories after confirming the user
                    fetchUserStories(userId);
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, [userId, navigate]);

    const fetchUserStories = (userId) => {
        axios.get(`http://localhost:9000/assignedUserStories/${userId}`)
            .then(response => {
                setUserStories(response.data); // Set the user stories in state
            })
            .catch(error => {
                console.error("Error fetching user stories:", error);
            });
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page!</p>
            {userName ? (
                <>
                    <p>Welcome, {userName}!</p>
                    <ul>
                        {userStories.map(story => (
                            <li key={story._id}>
                                {story.user_story} - Priority: {story.priority}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <p>Loading user information...</p> // Show a loading or processing state
            )}
            {!userId && (
                <p className="text-center">
                    You need to log in. <Link to="/login">Login</Link>
                </p>
            )}
        </div>
    );
};

export default Home;
