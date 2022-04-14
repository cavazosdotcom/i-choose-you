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
    pokemon: {
        type: [Pokemon],
        validate: [arrayLimit, "{PATH} exceeds the limit of 6 pokemon per team"]
    }
});

function arrayLimit(array){
    return array.length <= 6;
}

const Team = model("Team", teamSchema);

module.exports = Team;