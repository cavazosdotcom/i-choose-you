import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_POKEMON, REMOVE_TEAM } from '../../utils/mutations';
import { QUERY_TEAMS } from '../../utils/queries';
import redX from "./img/red-x.png"
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
    // style={{float: "right", margin: "2px"}}
    // style={{background: `no-repeat center url(${imgSrc})`, width: "128px", height: "128px"}}
    return (
        <div className="card round-card row shadow m-3">
            <div className="card-header round-header d-flex justify-content-between bg-primary ">
                <Link to={"/team/" + teamName} className="text-decoration-none"><h3 className="text-white m-0">{teamName}</h3></Link >
                <button className='btn btn-outline-danger' onClick={(e) => handleTeamRemoval(teamName, e)}>X</button>
            </div>
            <div className="card-body round-body d-flex justify-content-start flex-wrap p-0">
                {console.log(currentTeam)}
                { (currentTeam.length === 0) ?

                (<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt="unown question mark form"></img>) : (
                currentTeam.map((p, index) => {
                    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.dexNumber}.png`;
                    return (
                    <div key={index} className="d-flex col-sm-2 col-4 d-flex justify-content-center align-center py-1 img-con">
                        <img src={imgSrc} alt="pokemon sprite" className="image-shake imageTwo" onClick={(e) => handleRemoval(teamName, p.pokeName, e)}></img>
                        <img src={redX} className="redX image imageOne hide" alt="red x"></img>
                        {/* <div className="image-overlay justify-content-center">
                            <p className='image-button'>X</p>
                        </div> */}
                    </div>)
                })
                )}
                

            </div>
        </div>
    )
}       

 export default TeamCard;