const { Schema, model } = require('mongoose');
const pokemonSchema = require('./Pokemon');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    game: {
        type: String,
        required: true
    },
    pokemon: [{
        type: pokemonSchema,
        validate: [arrayLimit, "Exceeds the limit of 6 pokemon per team"]
    }]
});

function arrayLimit(array){
    return array.length <= 6;
}

module.exports = teamSchema;