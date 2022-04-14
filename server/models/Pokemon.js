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
    type: {
        type: [String],
        validate: [typeLimit, "Exceeds the limit of 2 types per pokemon"]
    },
    moves: {
        type: [moveSchema],
        validate: [moveLimit, "Exceeds the limit of 4 moves per pokemon"]
    }
});

function moveLimit(moves){
    return moves.length <= 4;
}

function typeLimit(types){
    return types.length <= 2;
}

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;