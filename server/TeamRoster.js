const mongoose = require("mongoose");

const TeamRosterSchema = new mongoose.Schema({
    team_id: mongoose.Schema.Types.ObjectId,
    member_id: mongoose.Schema.Types.ObjectId
});

const TeamRoster = mongoose.model("TeamRoster", TeamRosterSchema);

module.exports = TeamRoster;
