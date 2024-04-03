const mongoose = require("mongoose");

// const TeamRosterSchema = new mongoose.Schema({
//     team_id: mongoose.Schema.Types.ObjectId,
//     member_id: mongoose.Schema.Types.ObjectId
// });

// const TeamRoster = mongoose.model("TeamRoster", TeamRosterSchema);

// module.exports = TeamRoster;


const TeamRosterSchema = new mongoose.Schema({
    team_id: mongoose.Schema.Types.ObjectId,
    member_ids: [mongoose.Schema.Types.ObjectId] // Use an array to store multiple member IDs
});

const TeamRoster = mongoose.model("TeamRoster", TeamRosterSchema);

module.exports = TeamRoster;

