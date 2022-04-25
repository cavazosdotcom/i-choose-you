import React from 'react';
import "./index.css";

const PokemonCard = ({pokemon, teamName, addPokemon}) => {
    const expression = /\d+/g;
    const [, dexNumber] = pokemon.url.match(expression);

    // TODO:
    return (
        <>
        <div className="card p-round-card border-3 border-dark shadow" id={dexNumber}>
            <div className="d-inline-flex">
                <div className="card-body p-round-body bg-danger text-white text-center wide">
                    <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <button className="btn btn-warning" onClick={() => {
                        addPokemon({variables: {teamName: teamName, pokeName:pokemon.name, dexNumber: parseInt(dexNumber)}});
                    }}>Add</button>
                </div>
                <div className="card-body p-round-img p-0">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`} className="wide" alt={`A small sprite of ${pokemon.name}`}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default PokemonCard;