const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Move {
    moveName: String
    moveType: String
  }

  type Pokemon {
    pokeName: String
    dexNumber: Int
    typeList: [String]
    moves: [Move]
  }

  type Team {
    teamName: String
    game: String
    pokemonList: [Pokemon]
  }

  input PokeInput {
    pokeName: String!
    dexNumber: Int!
    typeList: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    teamList: [Team]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    teamList: [Team]
    team(teamName: String): Team
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addTeam(teamName: String, game: String, pokemonList: [PokeInput]): User
    addPokemon(teamName: String!, pokeName: String!, dexNumber: Int!, typeList: [String]): User
    removeTeam(teamName: String!): User
    removePokemon(teamName: String!, pokeName: String!): Team
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
