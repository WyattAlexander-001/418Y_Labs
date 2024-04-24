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

      {/* user_story: story.user_story,
      project_name: project.proj_name,
      priority: story.priority */}


        {userStories.map((story, index) => (
          <li key={index}>
            <strong>{story.user_story}</strong> (Priority: {story.priority}) - Project NAME: {story.project_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewUserStory;
