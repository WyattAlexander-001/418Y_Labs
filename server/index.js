const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

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


// Define the User schema and model
const userSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    username: { type: String, unique: true },
    password: String
  });

  //Model
  const User = mongoose.model('User', userSchema, "users");


app.get('/', (req, res) => {
    res.send('Hello, world! This is the API root.');
});


app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password; // In real applications, use hashed passwords
    try {
      const user = await User.findOne({ username: username });
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
  