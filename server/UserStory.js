const mongoose = require("mongoose");

//Correct
const UserStorySchema = new mongoose.Schema({
    user_story: String,
    proj_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    priority: { type: Number, default: 0 }
});

const UserStory = mongoose.model("UserStory", UserStorySchema);

module.exports = UserStory;
