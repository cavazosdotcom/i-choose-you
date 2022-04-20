import React from 'react';
import "./index.css";
import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';
// import { Link } from 'react-router-dom';

const PokemonCard = ({pokemon}) => {
    const expression = /\d+/g;
    const [, dexNumber] = pokemon.url.match(expression);
    // console.log(dexNumber);
    const [addPokemon, { error }] = useMutation(ADD_POKEMON);
    
    // function addPokemon() {
    //     console.log(dexNumber);
    // };

    return (
        <>
        <div className="card border-3 border-dark shadow" id={dexNumber}>
            <div className="d-inline-flex">
                <div className="card-body bg-danger text-white text-center wide">
                    <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <button className="btn btn-primary" onClick={() => addPokemon()}>+</button>
                </div>
                <div className="card-body p-0">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`} className="wide" alt={`A small sprite of ${pokemon.name}`}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default PokemonCard;