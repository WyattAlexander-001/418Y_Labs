import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUserStory() {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/getUserStories')
      .then((response) => {
        setUserStories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user stories: ", error);
      });
  }, []);

  return (
    <div>
      <h2>User Stories:</h2>
      <ul>
        {userStories.map((story, index) => (
          <li key={index}>
            <strong>{story.user_story}</strong> (Priority: {story.priority}) - Project ID: {story.proj_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewUserStory;
