import React from 'react';
import "./index.css";
import { useMutation } from '@apollo/client';
import { ADD_POKEMON } from '../../utils/mutations';

// import { Link } from 'react-router-dom';

const PokemonCard = ({pokemon, teamName}) => {
    const expression = /\d+/g;
    const [, dexNumber] = pokemon.url.match(expression);
    // console.log(dexNumber);
    const [addPokemon, { error }] = useMutation(ADD_POKEMON);
    

    // const [teamName, setTeamName] = useState();

    // function addPokemon() {
    //     console.log(dexNumber);
    // };

    // TODO:
    return (
        <>
        <div className="card border-3 border-dark shadow" id={dexNumber}>
            <div className="d-inline-flex">
                <div className="card-body bg-danger text-white text-center wide">
                    <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <button className="btn btn-primary" onClick={() => addPokemon({variables: {teamName: teamName, pokeName:pokemon.name}})}>+</button>
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