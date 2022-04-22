import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TEAMS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Home from '../../pages/Home';
// import "./index.css"

const TeamCard = ({ teams }) => {
    /**
     * useQuery - Array of 6 pokemon objects `{imageUrl, name}`
     *  - listen for clicks for removal
     */
    
    // const team = console.log(getTeams)
    /**
     * Component 
     *  - large div, filled with 6 rounded images
     */

    // console.log(teams)

    return (
        <div>
            {/* <li>{teams.teamName} {teams.pokemonList[0]?.pokeName || []}</li> */}
            <Link to={"team/"+ teams.teamName}>
            <li>{teams.teamName} {teams.pokemonList.map((p) => p.pokeName)}</li>
            </Link >
        </div>
        
    )
}

 export default TeamCard;