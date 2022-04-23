import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_POKEMON } from '../../utils/mutations';
import { QUERY_TEAMS } from '../../utils/queries';
// import "./index.css"

const TeamCard = ({ team }) => {
    console.log(team["pokemonList"]);
    const [currentTeam, setTeam] = useState(team.pokemonList);
    const teamName = team.teamName;

    const [removePokemon, {data, loading}] = useMutation(REMOVE_POKEMON);
    
    async function handleRemoval(teamName, pokeName, event){
        await removePokemon({variables: {
            pokeName,
            teamName
        }});
        // event.target.parentElement.style.display = "none";
    }
    /**
     * Component 
     *  - large div, filled with 6 rounded images
     */
    console.log(currentTeam);
    useEffect(() => {
        setTeam(team.pokemonList)
    }, [team.pokemonList])

    useEffect(() => {
        if(!loading && data){
            console.log(data);
            setTeam(data.removePokemon.pokemonList);
        }
    }, [loading, data])

    return (
        <div>
            <Link to={"/team/"+ teamName}><h3>{teamName}</h3></Link >
            <div style={{display: "flex"}}>
                {currentTeam.map((p, index) => {
                    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`;
                    return (
                    <div key={index} style={{background: `no-repeat center url(${imgSrc})`, width: "128px", height: "128px"}}>
                        <button className='btn btn-outline-danger' style={{float: "right", margin: "2px"}} onClick={(e) => handleRemoval(teamName, p.pokeName, e)}>X</button>
                    </div> )
                })}
            </div>
        </div>
        
    )
}       

 export default TeamCard;