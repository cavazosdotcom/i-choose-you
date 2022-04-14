const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const pokeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: [String],
    moves: [moveSchema]
});

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;