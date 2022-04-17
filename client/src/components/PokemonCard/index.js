import React from 'react';
import "./index.css"
// import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {


    return (
        <div className="card g-3 m-2 round bg-light shadow border-0">
            <div className="card-body d-flex">
                <div className="me-auto">
                    <h1 className="">{pokemon.name}</h1>
                    <h2 className="">#{pokemon.id}</h2>
                </div>
                
                    {(pokemon.types.length === 1) ? (
                    <div className="p-2 align-self-center btn btn-info text-white">{pokemon.types[0].type.name}</div>
                    ) : (
                        <div className="row">
                        {pokemon.types.map((p) => {
                            console.log(p)
                            return <div className="p-2 align-self-center btn btn-info text-white" key={p.type.name}>{p.type.name}</div>
                        })}
                        </div>
                    )}   

                    <img className="px-4 py-3" src={pokemon.sprites.versions["generation-iii"]["emerald"].front_default} alt={pokemon.name}></img>
                
            </div>
        </div>
    )
}

export default PokemonCard;