import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm/index"
import API from "../utils/API";
import AuthService from "../utils/auth"
import PokemonCard from "../components/PokemonCard";
import { useParams } from "react-router";
import TeamCard from "../components/TeamCard";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_TEAMS } from "../utils/queries";
import { ADD_POKEMON } from "../utils/mutations";

// building version with both fetches to retrieve on page load
const TeamBuilder = () => {
    const navigate = useNavigate();
    const { data, loading } = useQuery(QUERY_TEAMS);
    const { teamName: userParam } = useParams();
    const [addPokemon, { error }] = useMutation(ADD_POKEMON, {
        refetchQueries: [
            QUERY_TEAMS,
        ]
    });
    

    const [team, setTeam] = useState({teamName: "Loading", pokemonList: []});
    const [pokemon, setPokemon] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    // update to run getPokemonData with useState
    useEffect(() => {
        if(!AuthService.loggedIn()){
            navigate("/login");
        }
        // calls pokemon fetch "search" method from API folder,
        const getPokemon = async () => {
            const res = await API.search("pokedex/kanto")
            // sets "pokemon" state to the response results
            setPokemon(res.data.pokemon_entries)
        }
        getPokemon();
    }, [])

    useEffect(() => {
        if(!loading && data){
            const myTeam = data.teamList.find((team) => team.teamName === userParam);
            console.log(myTeam)
            setTeam(myTeam);
        }
    }, [loading, data, userParam])

    useEffect(() => {
        setLoading(!pokemon) 
    }, [pokemon])

    function handleClick(vars){
        addPokemon(vars);
        if(error){
            console.log(error);
        }
    }
    
    return (
        <>
            {loading ? <div>loading</div> : <TeamCard team={team}/>}
            {/* <SearchForm /> */}
            <input
            className="d-flex mx-auto my-4"
            type="text"
            placeholder="Search..."
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            />
            <div className="d-flex flex-wrap gap-4 justify-content-center">
                {(isLoading) ? <div>loading...</div> : pokemon.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.pokemon_species.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map(poke => <PokemonCard key={poke.entry_number} pokemon={poke.pokemon_species} teamName={userParam} addPokemon={handleClick}/>)}
            </div>
        </>
    )
        
}
export default TeamBuilder;