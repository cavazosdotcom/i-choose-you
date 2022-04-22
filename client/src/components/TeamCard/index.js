import React from 'react';
import { Link } from 'react-router-dom';
// import "./index.css"

const TeamCard = ({ team }) => {
    
    /**
     * Component 
     *  - large div, filled with 6 rounded images
     */

    return (
        <div>
            <Link to={"team/"+ team.teamName}><h3>{team.teamName}</h3></Link >
                {team.pokemonList.map((p, index) => {
                    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`;
                    return <img key={index} src={imgSrc} className="wide" alt={`A small sprite of ${p.pokeName}`}/>
                })
            }
        </div>
        
    )
}       

 export default TeamCard;