const { Schema, model } = require('mongoose');

const teamSchema = new Schema({

});

const Team = model("Team", teamSchema);

module.exports = Team;