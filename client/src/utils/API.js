import axios from 'axios';

const search = async (query) =>
   axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);

// eslint-disable-next-line
export default { search };