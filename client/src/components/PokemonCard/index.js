import React from 'react';
import "./index.css"
// import { Link } from 'react-router-dom';

const PokemonCard = ({pokemon}) => {
    const expression = /\d+/g;
    const [, dexNumber] = pokemon.url.match(expression);
    console.log(dexNumber);

    return (
        // <div className="card g-3 m-2 round bg-light shadow border-0">
        //     <div className="card-body d-flex">
        //         <div className="me-auto">
        //             <h1 className="">{pokemon.name}</h1>
        //             <h2 className="">#{pokemon.id}</h2>
        //         </div>
                
        //             {(pokemon.types.length === 1) ? (
        //             <div className="p-2 align-self-center btn btn-info text-white">{pokemon.types[0].type.name}</div>
        //             ) : (
        //                 <div className="row">
        //                 {pokemon.types.map((p) => {
        //                     console.log(p)
        //                     return <div className="p-2 align-self-center btn btn-info text-white" key={p.type.name}>{p.type.name}</div>
        //                 })}
        //                 </div>
        //             )}   

        //             <img className="px-4 py-3" src={pokemon.sprites.versions["generation-iii"]["emerald"].front_default} alt={pokemon.name}></img>
                
        //     </div>
        // </div>
        <>
        <div className="card border-3 border-dark shadow" id={dexNumber}>
            <div className="d-inline-flex">
                <div className="card-body bg-danger text-white text-center wide">
                    <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <div className="btn btn-primary">+</div>
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