const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Move {
    name: String
    type: String
  }

  type Pokemon {
    name: String
    type: [String]
    moves: [Move]
  }

  type Team {
    teamName: String
    game: String
    pokemon: [Pokemon]
  }

  input PokeInput {
    name: String!
    type: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    teams: [Team]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    teams: [Team]
    team(name: String): Team
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addTeam(name: String, game: String, pokemon: [PokeInput]): User
    addPokemon(name: String!, type: [String]): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
