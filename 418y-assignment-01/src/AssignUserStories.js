import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignUserStories() {
    const [userStories, setUserStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/unassignedUserStories')
            .then(res => {
                setUserStories(res.data);
            })
            .catch(error => console.error("Error fetching user stories:", error));
    }, []);

    const handleAssign = (id) => {
        const userId = localStorage.getItem('loggedInUser');  // Fetch user ID from local storage
        axios.post('http://localhost:9000/assignUserStory', { id, userId })
            .then(() => {
                alert('User story assigned successfully');
                setUserStories(prevStories => prevStories.filter(story => story._id !== id));
            })
            .catch(error => {
                console.error('Failed to assign user story', error);
                alert('Failed to assign user story');
            });
    };
    
    
    

    return (
        <div>
            <h2>Assign User Stories</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Story</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {userStories.map(story => (
                        <tr key={story._id}>
                            <td>{story.user_story}</td>
                            <td><button onClick={() => handleAssign(story._id)}>Assign</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignUserStories;
