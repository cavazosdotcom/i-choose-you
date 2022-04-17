import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm/index"
import PokemonList from "../components/Pokemon/PokemonList";
import API from "../utils/API";
import PokemonCard from "../components/PokemonCard";
// import Pokedex from "pokedex-promise-v2";

function  TeamBuilder() {

    // // needed for Pokedex package
    
    // const P = new Pokedex();
    // // async function to fetch pokemon data from API, using promise based cb function from npm package
    // (async () => { // with Async/Await
    //     try {
    //         const golduck = await P.getPokemonSpeciesByName("froakie")
    //         // const frenchName = golduckSpecies.names.filter(pokeAPIName => pokeAPIName.language.name === 'fr')[0].name
    //         console.log(golduck)
    //     } catch (error) {
    //         throw error
    //     }
    // })()

    // axios method, pokemon and loading data
    const [pokemon, setPokemon] = useState(null)
    const [isLoading, setLoading] = useState(true)

    // searchPokemon function, using axios, search pokemon based on query and return pokemon data
    // loading is false once data is fetched
    const searchPokemon = async (query) => {
        const res = await API.search(query)
        setPokemon(res.data)
        // setLoading(false)
    }

    // search for pikachu on page load 
    useEffect(() => {
        searchPokemon('pikachu')
    }, []);

    // sets loading to change when pokemon changes
    useEffect(() => {
        setLoading(!pokemon) 
      }, [pokemon])
    
      console.log(pokemon)  


    // change loading to gif
    return (
        <>
        <SearchForm onFormSubmit={searchPokemon} />
        {/* {(isLoading) ? <div>loading...</div> : <PokemonList pokemon={pokemon} />} */}
        {/* {<PokemonList pokemon={pokemon} />} */}
        {(isLoading) ? <div>loading...</div> : <PokemonCard pokemon={pokemon}/>}
        
    </>
    
    );
    }

export default TeamBuilder;