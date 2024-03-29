const mongoose = require("mongoose");

const TeamRosterSchema = new mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    member_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const TeamRoster = mongoose.model("TeamRoster", TeamRosterSchema);

module.exports = TeamRoster;
