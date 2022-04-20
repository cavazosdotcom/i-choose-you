const { Schema, model } = require('mongoose');
const pokemonSchema = require('./Pokemon');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
        default: "red-blue",
        required: true
    },
    pokemonList: {
        type: [pokemonSchema],
        default: [],
        validate: [arrayLimit, "Exceeds the limit of 6 pokemon per team"]
    }
});

function arrayLimit(array){
    return array.length <= 6;
}

module.exports = teamSchema;