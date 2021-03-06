import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_TEAM = gql`
//   mutation addTeam($pokemonData: PokemonInput!) {
//     savePokemon(pokemonData: $pokemonData) {
//     _id
//     name
//     type
//     savedPokemons {
//     height
//     origin
//     weakness
//     }
//     }
//   }
// `;
export const ADD_TEAM = gql`
  mutation Mutation($teamName: String, $game: String) {
  addTeam(teamName: $teamName, game: $game) {
    _id
  }
}
`;


export const REMOVE_TEAM = gql`
  mutation Mutation($teamName: String!) {
  removeTeam(teamName: $teamName) {
    teamList {
      teamName
      pokemonList {
        pokeName
        dexNumber
      }
    }
  }
}
`;
// export const ADD_POKEMON = gql`
//   mutation addPokemon ($pokemonData: PokemonInput!) {
//     savePokemon(pokemonData: $pokemonData) {
//     _id
//     name
//     type
//     savedPokemons {
//     height
//     origin
//     weakness
//     }
//     }
//   }
// `;
export const ADD_POKEMON = gql`
  mutation AddPokemon($teamName: String!, $pokeName: String!, $dexNumber: Int!) {
  addPokemon(teamName: $teamName, pokeName: $pokeName, dexNumber: $dexNumber) {
    teamList {
      pokemonList {
        pokeName
        dexNumber
      }
    }
  }
}
`;

export const REMOVE_POKEMON = gql`
  mutation removePokemon($teamName: String!, $pokeName: String!) {
    removePokemon(teamName: $teamName, pokeName: $pokeName) {
      teamName
      pokemonList {
        pokeName
        dexNumber
      }
    }
  }
`;