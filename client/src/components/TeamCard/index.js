import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TEAMS } from '../../utils/queries';
import "./index.css"

const TeamCard = () => {
    /**
     * useQuery - Array of 6 pokemon objects `{imageUrl, name}`
     *  - listen for clicks for removal
     */
    const { loading, data } = useQuery(QUERY_TEAMS);

    /**
     * Component 
     *  - large div, filled with 6 rounded images
     */

    return (
        <div>
            {loading ? (
            <div>Loading...</div> 
            ) : (
            <div>

            </div>)}
        </div>
        
    )
}

 export default TeamCard;