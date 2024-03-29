const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Users = require('./Users.js') //lab 2
const Project = require('./Projects.js') //lab 3
const TeamName = require('./TeamName.js') //lab 3

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
            console.log(`Project created! ${project}`)
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

app.get('/getProjects', async (req, res) => {
  try {
    const projects = await Project.find();
    const simpleProjects = projects.map(project => ({
      project_name: project.proj_name,
      description: project.proj_desc,
      owner_details: project.prod_owner_id,
      manager_details: project.mgr_id,
      team_details: project.team_id,
    }));
    res.send(simpleProjects);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred fetching projects from the database.");
  }
});


app.get('/getTeams', async (req, res) => {
  try {
      const teams = await TeamName.find()
      res.send(teams)
  }
  catch (error) {
      res.status
  }
})



  