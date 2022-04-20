import axios from 'axios';

const search = async (query) =>
   axios.get(`https://pokeapi.co/api/v2/${query}`);

// search for first TeamBuilder version, need to export searchData with use
// const searchData = async (query) =>
//    axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);

// eslint-disable-next-line
export default { search };