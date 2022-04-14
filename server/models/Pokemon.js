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
        validate: [arrayLimit, "{PATH} exceeds the limit of 4 moves per pokemon"]
    },
    moves: [moveSchema]
});

function arrayLimit(array){
    return array.length <= 4;
}

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;