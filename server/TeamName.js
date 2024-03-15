const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    team_name: String
});

const TeamName = mongoose.model("Team", TeamSchema);

module.exports = TeamName;