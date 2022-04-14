const { Schema, model } = require('mongoose');
const Pokemon = require('./Pokemon');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    pokemon: [Pokemon]
});

const Team = model("Team", teamSchema);

module.exports = Team;