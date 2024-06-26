const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Users = require('./Users.js') //lab 2
const Project = require('./Projects.js') //lab 3
const TeamName = require('./TeamName.js') //lab 3

const TeamRoster = require('./TeamRoster.js'); //lab 4
const UserStory = require('./UserStory.js'); // lab 4

app.use(express.json());
app.use(cors())

app.listen(9000, () => {
    console.log(`Server is running on port ${9000}`);
})

const mongoString = "mongodb+srv://Wyatt:cupcake@cluster0.vlapxri.mongodb.net/lab"

//Connect to MongoDB
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection
database.on('error',(error) => console.error(error))
database.once('connected', () => console.log('Connected to Database'))

app.get('/', (req, res) => {
    res.send('Hello, world! This is the API root.');
});


//lab 2
app.post('/createUser', async (req, res) => {
    try {
        const user = new Users(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//lab 2
  app.get('/getUser', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password; 
    try {
      const user = await Users.findOne({ username: username });
      if(user && user.password === password) {
        // Passwords match
        res.send({ message: 'Login was successful', user });
      } else {
        // Username not found or passwords don't match
        res.status(401).send({ message: 'YOU FAILED BRUH' });
      }
    }
    catch (error) {
      res.status(500).send(error);
    }
});


  //lab 3
  app.post('/createProject', async (req, res) => {
    try {
            const project = new Project(req.body);
            project.save()
            // console.log(`Project created! ${project}`)
            res.send(project)
    }
    catch (error){
        res.status(500).send(error)
    }
})

// Endpoint to create a team
app.post('/createTeam', async (req, res) => {
  try {
      // Create a new team using the model and request body
      const team = new TeamName({
          team_name: req.body.team_name
      });

      // Save the new team to the database
      await team.save();

      // Send a success response back
      res.status(201).send({ message: "Team created successfully", team: team });
  } catch (error) {
      res.status(500).send(error);
  }
});

// Get all projects, Google Find Fucntion // Fetches All the data & builds userlist
app.get('/getUsers', async (req, res) => {
  try {
      const userList = await Users.find({}, {firstName:1, lastName:1, username:1, _id:1});
      console.log("User list: " + userList)
      res.send(userList)
  }
  catch (error) {
      res.status(500).send(error)
  }
})

//This returns:
/* 
Project Name: | Description: | Product Owner: | Manager: | Team: |
Test Project | This is a test | 


*/
// app.get('/getProjects', async (req, res) => {
//   try {
//     res.send([{project_name: "Test Project", description: "This is a test"}]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

//Don't Change!
app.get('/getProjects', async (req, res) => {
  try {
      const projects = await Project.find()
      let responseDetails = []
      for (const project of projects) {
        console.log("project: " + project)
         const manager = await Users.findById(project.mgr_id) //mgr_id matches schema
         console.log("manager: " + manager)
         const owner = await Users.findById(project.prod_owner_id) //prod_owner_id matches schema
          console.log("owner: " + owner)
         const team = await TeamName.findById(project.team_id) //team_id matches schema
          console.log("team: " + team)
         responseDetails.push({
          //Use the left hand side to display the data
           project_name: project.proj_name,
           description: project.proj_desc,
           manager_details: manager,
           owner_details: owner,
           team_details: team
         })
      }
      res.send(responseDetails)
  }
  catch (error) {
      res.status(500).send(error)
  }
})


app.get('/getTeams', async (req, res) => {
  try {
      const teams = await TeamName.find()
      res.send(teams)
  }
  catch (error) {
      res.status
  }
})

// Endpoint to create a team roster
// app.post('/addMembersToTeam', async (req, res) => {
//   try {
//     console.log("Members:" + req.body.member_ids)
//     for (const member_id of req.body.member_ids) {
//       const teamRoster = new TeamRoster({
//         team_id: req.body.team_id,
//         member_id: member_id
//       });
//       await teamRoster.save();
//     }
//     res.status(200).send("Members added to team roster successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred adding members to team roster.");
//   }
// });

app.post('/addMembersToTeam', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the entire request body to see the data structure

    const { team_id, member_ids } = req.body;
    console.log("Team ID:", team_id);
    console.log("Member IDs:", member_ids);

    // Create a single document with the team_id and all member_ids
    const teamRoster = new TeamRoster({
      team_id,
      member_ids
    });
    await teamRoster.save();

    console.log("Saved Team Roster:", teamRoster); // Log the saved team roster document

    res.status(200).send({ message: "Members added to team roster successfully.", roster: teamRoster });
  } catch (error) {
    console.error("An error occurred adding members to team roster:", error);
    res.status(500).send({ message: "An error occurred adding members to team roster.", error: error });
  }
});




// Endpoint to get team members by team ID
app.get('/getTeamMembers/:teamId', async (req, res) => {
  try {
      console.log("Fetching roster for team ID:", req.params.teamId);
      const roster = await TeamRoster.findOne({ team_id: req.params.teamId }).populate('member_ids');
      console.log("Found roster:", roster);
      if (!roster) {
          return res.status(404).send({ message: "Roster not found" });
      }
      console.log("Member IDs:", roster.member_ids);
      res.send(roster.member_ids); // Sending back only the member details
  } catch (error) {
      console.error("Failed to fetch team members:", error);
      res.status(500).send(error);
  }
});


app.get('/getProjectsForUserStory', async (req, res) => {
  try {
      const projects = await Project.find()
      res.send(projects)
  }
  catch (error) {
      res.status
  }
})



// Endpoint to create a user story
app.post('/createUserStory', async (req, res) => {
    try {
        const story = new UserStory(req.body);
        await story.save();
        res.status(201).send({ message: "User story created successfully", story: story });
    } catch (error) {
        console.error("Failed to create user story:", error);
        res.status(500).send(error);
    }
});



app.get('/getUserStories', async (req, res) => {
  try {
      const stories = await UserStory.find()
      let responseDetails = []
      for (const story of stories) {

         console.log("story: " + story)

          const project = await Project.findById(story.proj_id)

          console.log("project: " + project)

          responseDetails.push({
              user_story: story.user_story,
              project_name: project.proj_name,
              priority: story.priority
          })
      }
      res.send(responseDetails)
  }
  catch (error) {
      res.status
  }
})

// Assign and Edit User Stories:

// Route to get unassigned user stories
app.get('/unassignedUserStories', async (req, res) => {
  try {
      const stories = await UserStory.find({ assigned_to: null }); // Assuming 'assigned_to' field exists
      res.json(stories);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to assign a user story
app.post('/assignUserStory', async (req, res) => {
  console.log("Assigning User Story, User ID:", req.body.userId);
  console.log("Story ID to assign:", req.body.id);
  try {
      const { id, userId } = req.body;  // Get user ID from the request body
      if (!userId) {
          return res.status(401).json({ message: "User ID not provided" });
      }

      const result = await UserStory.findByIdAndUpdate(id, { assigned_to: userId }, { new: true });
      if (!result) {
          return res.status(404).json({ message: "User story not found" });
      }
      res.json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// app.post('/assignUserStory', async (req, res) => {
//   try {
//       const { id } = req.body;
//       // Temporarily use a hardcoded user ID
//       const userId = "someHardcodedUserId"; // Replace with an actual user ID from your database
//       const result = await UserStory.findByIdAndUpdate(id, { assigned_to: userId }, { new: true });
//       res.json(result);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });





// Route to get user stories for a project
app.get('/userStories/:projectId', async (req, res) => {
  console.log("WTF???")
  console.log("Received projectId:", req.params.projectId); // Should be an ObjectId
  try {
    // Find the project ObjectId based on the project name
    const project = await Project.findOne({ proj_name: req.params.projectId });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const projectId = project._id; // Get the ObjectId of the project
    const stories = await UserStory.find({ proj_id: projectId });
    res.json(stories);
  } catch (error) {
      console.error('Error fetching user stories:', error);
      res.status(500).json({ message: error.message });
  }
});


// Route to delete a user story
app.delete('/deleteUserStory/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await UserStory.findByIdAndDelete(id);
      res.json({ message: 'User story deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Get user stories assigned to a specific user
app.get('/assignedUserStories/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      const stories = await UserStory.find({ assigned_to: userId }).exec(); // Ensure you're querying the correct field
      res.json(stories);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Get user by ID
app.get('/getUserById/:userId', async (req, res) => {
  try {
      const user = await Users.findById(req.params.userId);
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Route to update a user story
app.put('/updateUserStory/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const updates = req.body;

      const updatedStory = await UserStory.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedStory) {
          return res.status(404).json({ message: "User story not found" });
      }
      res.json({ message: "User story updated successfully", updatedStory });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});





