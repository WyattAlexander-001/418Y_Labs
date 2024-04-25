import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUserStories() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [userStories, setUserStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then(response => {
                console.log("Projects loaded:", response.data); // Debug output
                setProjects(response.data);
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);
    

    useEffect(() => {
        console.log("Currently selected project ID:", selectedProjectId); // This should be an ObjectId
        if (selectedProjectId) {
            axios.get(`http://localhost:9000/userStories/${selectedProjectId}`)
                .then(response => {
                    setUserStories(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user stories:', error);
                });
        } else {
            setUserStories([]); // No project selected, or invalid ID
        }
    }, [selectedProjectId]);
    

    const handleDeleteStory = (userStoryId) => {
        axios.delete(`http://localhost:9000/deleteUserStory/${userStoryId}`)
            .then(() => {
                setUserStories(userStories.filter(story => story._id !== userStoryId));
            })
            .catch(error => console.error('Error deleting user story:', error));
    };

    return (
        <div>
            <h2>Edit User Stories</h2>
            <select onChange={(e) => setSelectedProjectId(e.target.value)} value={selectedProjectId}>
                <option value="">Select a Project</option>
                {projects.map(project => (
                    <option key={project._id} value={project._id}>
                        {project.project_name}
                    </option>
                ))}
            </select>


            <table>
                <thead>
                    <tr>
                        <th>User Story</th>
                        <th>Priority</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userStories.length > 0 ? userStories.map(story => (
                        <tr key={story._id}>
                            <td>{story.user_story}</td>
                            <td>{story.priority}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={() => handleDeleteStory(story._id)}>Delete</button></td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">No user stories found for this project</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EditUserStories;
