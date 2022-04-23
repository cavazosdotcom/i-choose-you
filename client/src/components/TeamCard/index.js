import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_POKEMON, REMOVE_TEAM } from '../../utils/mutations';
import { QUERY_TEAMS } from '../../utils/queries';
//import "./index.css"

const TeamCard = ({ team }) => {
    console.log(team["pokemonList"]);
    const [currentTeam, setTeam] = useState(team.pokemonList);
    const teamName = team.teamName;

    const [removePokemon, {data, loading}] = useMutation(REMOVE_POKEMON);
    const [removeTeam, {teamData, teamLoading}] = useMutation(REMOVE_TEAM)

    async function handleRemoval(teamName, pokeName, event){
        await removePokemon({variables: {
            pokeName,
            teamName
        }});
        // event.target.parentElement.style.display = "none";
    }

    async function handleTeamRemoval(teamName, event) {
        await removeTeam({variables: {
            teamName
        }})
        window.location.reload();
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
    // TODO: Show 6 unown
    // TODO: refactor images to bootstrap
    // TODO: Add team with form submit AND on click
    // TODO: Only delete on home page, not on team builder page
    return (
        <div className="card d-flex my-2">
            <div className="card-header d-flex justify-content-between">
                <Link to={"/team/"+ teamName}><h3>{teamName}</h3></Link >
                <button className='btn btn-outline-danger' style={{float: "right", margin: "2px"}} onClick={(e) => handleTeamRemoval(teamName, e)}>X</button>
            </div>
            <div className="card-body" style={{display: "flex"}}>
                {console.log(currentTeam)}
                { (currentTeam.length === 0) ?
                (<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt="unown question mark form"></img>
                ) : (
                currentTeam.map((p, index) => {
                    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`;
                    return (
                    <div key={index} style={{background: `no-repeat center url(${imgSrc})`, width: "128px", height: "128px"}}>
                        <button className='btn btn-outline-danger' style={{float: "right", margin: "2px"}} onClick={(e) => handleRemoval(teamName, p.pokeName, e)}>X</button>
                    </div>)
                })
                )}
                

            </div>
        </div>
        
    )
}       

 export default TeamCard;