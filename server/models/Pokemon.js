const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
    moveName: {
        type: String,
        required: true
    },
    moveType: {
        type: String,
        required: true
    }
});

const pokeSchema = new Schema({
    pokeName: {
        type: String,
        required: true
    },
    typeList: {
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

module.exports = pokeSchema;