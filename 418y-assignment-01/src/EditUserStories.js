import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUserStories() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [userStories, setUserStories] = useState([]);
    const [editingStory, setEditingStory] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    useEffect(() => {
        if (selectedProjectId) {
            axios.get(`http://localhost:9000/userStories/${selectedProjectId}`)
                .then(response => {
                    setUserStories(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user stories:', error);
                });
        } else {
            setUserStories([]);
        }
    }, [selectedProjectId]);

    const handleDeleteStory = (userStoryId) => {
        axios.delete(`http://localhost:9000/deleteUserStory/${userStoryId}`)
            .then(() => {
                setUserStories(userStories.filter(story => story._id !== userStoryId));
            })
            .catch(error => console.error('Error deleting user story:', error));
    };

    const handleEditClick = (story) => {
        setEditingStory(story._id);
        setEditText(story.user_story);
    };

    const handleEditChange = (event) => {
        setEditText(event.target.value);
    };

    const handleUpdateStory = (id) => {
        axios.put(`http://localhost:9000/updateUserStory/${id}`, {
            user_story: editText
        }).then(response => {
            const updatedStories = userStories.map(story => {
                if (story._id === id) {
                    return { ...story, user_story: editText };
                }
                return story;
            });
            setUserStories(updatedStories);
            setEditingStory(null);
            setEditText('');
        }).catch(error => console.error('Error updating user story:', error));
    };

    const handleCancelEdit = () => {
        setEditingStory(null);
        setEditText('');
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
                            <td>
                                {editingStory === story._id ? (
                                    <input type="text" value={editText} onChange={handleEditChange} />
                                ) : (
                                    story.user_story
                                )}
                            </td>
                            <td>{story.priority}</td>
                            <td>
                                {editingStory === story._id ? (
                                    <>
                                        <button onClick={() => handleUpdateStory(story._id)}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditClick(story)}>Edit</button>
                                )}
                            </td>
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
