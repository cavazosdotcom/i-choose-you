import React from 'react';

function PokemonList({ pokemon }) {
    // console.log(pokemon.moves)
    return (
        <div>
            <p>name: {pokemon.name}</p>
            <p>height: {pokemon.height}</p>
            <p>pokedex id: {pokemon.id}</p>
            <p>{pokemon.moves[0].move.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
            <img src={pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default} alt={pokemon.name}></img>
            <ul>
                {pokemon.moves.map((p) => {
                   return <li key={p.move.name}>{p.move.name}</li>
                })}
            </ul>
        </div>
    )
}

export default PokemonList;
