import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REMOVE_POKEMON, REMOVE_TEAM } from '../../utils/mutations';
import { QUERY_TEAMS } from '../../utils/queries';
import redX from "./img/red-x.png"

const TeamCard = ({ team }) => {

    const [currentTeam, setTeam] = useState(team.pokemonList);
    const navigate = useNavigate();
    const teamName = team.teamName;

    const [removePokemon, {data, loading}] = useMutation(REMOVE_POKEMON);
    const [removeTeam, {teamData, teamLoading}] = useMutation(REMOVE_TEAM)

    async function handleRemoval(teamName, pokeName, event){
        await removePokemon({variables: {
            pokeName,
            teamName
        }});
    }

    async function handleTeamRemoval(teamName, event) {
        await removeTeam({variables: {
            teamName
        }})
        navigate("/", {replace: true})
        window.location.reload();
    }
    /**
     * Component 
     *  - large div, filled with 6 rounded images
     */
    useEffect(() => {
        setTeam(team.pokemonList)
    }, [team.pokemonList])

    useEffect(() => {
        if(!loading && data){
            setTeam(data.removePokemon.pokemonList);
        }
    }, [loading, data])

    return (
        <div className="card round-card row shadow m-3">
            <div className="card-header round-header d-flex justify-content-between bg-primary align-items-center">
                <Link to={"/team/" + teamName} className="text-decoration-none"><h3 className="text-white m-0">{teamName}</h3></Link >
                <div>
                    <Link to={`/team/${teamName}`}><button className='btn btn-secondary'>Edit</button></Link>
                    <button style={{marginLeft: "5px"}} className='btn btn-danger' onClick={(e) => handleTeamRemoval(teamName, e)}>X</button>
                </div>
            </div>
            <div className="card-body round-body d-flex justify-content-start flex-wrap p-0">
                { (currentTeam.length === 0) ?

                (<Link to={`/team/${teamName}`}><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt="unown question mark form"></img></Link>) : (
                currentTeam.map((p, index) => {
                    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`;
                    return (
                    <div key={index} className="d-flex col-sm-2 col-4 d-flex justify-content-center align-center py-1 img-con">
                        <img src={imgSrc} alt="pokemon sprite" className="image-shake imageTwo" onClick={(e) => handleRemoval(teamName, p.pokeName, e)}></img>
                        <img src={redX} className="redX image imageOne hide" alt="red x"></img>
                    </div>)
                })
                )}

            </div>
        </div>
    )
}       

 export default TeamCard;