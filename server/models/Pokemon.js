const { Schema, model } = require('mongoose');

const pokeSchema = new Schema({

});

const Pokemon = model("Pokemon", pokeSchema);

module.exports = Pokemon;