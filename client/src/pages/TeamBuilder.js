import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm/index"
import PokemonList from "../components/Pokemon/PokemonList";
import API from "../utils/API";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { useParams } from "react-router";

// First TeamBuilder Function, has a search so we can search for pokemon and retrieve data for that specific pokemon 

// function  TeamBuilder() {

//     // axios method, pokemon and loading data
//     const [pokemon, setPokemon] = useState(null)
//     const [isLoading, setLoading] = useState(true)

//     // searchPokemon function, using axios, search pokemon based on query and return pokemon data
//     // loading is false once data is fetched
//     const searchPokemon = async (query) => {
//         const res = await API.searchData(query)
//         setPokemon(res.data)
//         // setLoading(false)
//     }

//     // search for pikachu on page load 
//     useEffect(() => {
//         searchPokemon('pikachu')
//     }, []);

//     // sets loading to change when pokemon changes
//     useEffect(() => {
//         setLoading(!pokemon) 
//       }, [pokemon])
    
//       console.log(pokemon)  


//     // change loading to gif
//     return (
//         <>
//         <SearchForm onFormSubmit={searchPokemon} />
//         {(isLoading) ? <div>loading...</div> : <PokemonCard pokemon={pokemon}/>}
        
//     </>
    
//     );
//     }

// export default TeamBuilder;


// building version with both fetches to retrieve on page load
const TeamBuilder = () => {
    
    const { teamName: userParam } = useParams();
    
    console.log(userParam)

    const [pokemon, setPokemon] = useState(null)
    // const [pokemonData, setPokemonData] = useState(null)
    const [isLoading, setLoading] = useState(true)
   

    // update to run getPokemonData with useState
    useEffect(() => {
        // calls pokemon fetch "search" method from API folder,
        const getPokemon = async () => {
            const res = await API.search("pokedex/kanto")
            // sets "pokemon" state to the response results
            console.log(res.data);
            setPokemon(res.data.pokemon_entries)
            
            // need a different method to call fetch for each pokemon to retrieve data
            // pokemon.map((p) => getPokemonData(p))
        }
        getPokemon();
    }, [])

    // accepts the result from getPokemon() 
    // const getPokemonData = async (resultPokemon) => {
    //     // takes url from resultPokemon
    //     let url = resultPokemon.url
    //     // fetch with url
    //     const res = await axios.get(url)

    //     // update pokemonData state to recieved pokemon data, only works with one pokemon at a time at the moment, need to iterate over resultPokemon array
    //     setPokemonData(res.data)
    // }


    useEffect(() => {
        setLoading(!pokemon) 
    }, [pokemon])

    console.log(pokemon)
    // console.log(pokemonData)
    
    return (
        <>
            <SearchForm />
            <div className="d-flex flex-wrap gap-4 justify-content-center">
                {(isLoading) ? <div>loading...</div> : pokemon.map(poke => <PokemonCard key={poke.entry_number} pokemon={poke.pokemon_species} teamName={userParam} />)}
            </div>
        </>
        )
        
}
export default TeamBuilder;