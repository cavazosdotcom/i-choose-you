const { Schema, model } = require('mongoose');
const pokemonSchema = require('./Pokemon');

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    game: {
        type: String,
        required: true
    },
    pokemonList: [{
        type: pokemonSchema,
        validate: [arrayLimit, "Exceeds the limit of 6 pokemon per team"]
    }]
});

function arrayLimit(array){
    return array.length <= 6;
}

module.exports = teamSchema;