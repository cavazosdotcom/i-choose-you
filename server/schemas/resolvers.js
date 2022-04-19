const { AuthenticationError, ValidationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    teamList: async (parent, args, context) => {
      if (context.user) {
        const user = User.findOne({ _id: context.user._id });
        return user.teamList;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addTeam: async (parent, args, context) => {
      if(context.user){
        const user = await User.findOne({ _id: context.user._id });
        const matchingTeams = user.teamList.filter((team) => team.teamName === args.teamName);
        if(matchingTeams.length !== 0){
          throw new ValidationError(`You already have a team named ${args.teamName}`);
        }
        user.teamList.push(args);
        user.save()
        return user.toJSON();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addPokemon: async (parent, args, context) =>{
      if(context.user) {
        const user = await User.findOne({ _id: context.user._id });
        user.teamList.map((team) => {
          if(args.teamName === team.teamName) {
            if(team.pokemonList.length === 6){
              throw new ValidationError("Pokemon teams may have up to only 6 pokemon");
            }
            team.pokemonList.push({pokeName: args.pokeName, typeList: args.typeList});
          }
        })
        user.save();
        return user.toJSON();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePokemon: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findOne({ _id: context.user._id });
        user.teamList.map((team) => {
          if(args.teamName === team.teamName) {
            const i = team.pokemonList.findIndex((pokemon) => pokemon.pokeName === args.pokeName);
            if(i === -1){
              throw new ValidationError(`Could not find ${args.pokeName} on ${args.teamName}`);
            }
            team.pokemonList.splice(i, 1);
          }
        })
        user.save();
        return user.toJSON();
      }
      throw new AuthenticationError('You need to be logged in!');  
    },
    removeTeam: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findOne({_id: context.user._id});
        const i = user.teamList.findIndex((team) => team === args.teamName);
        if(i === -1){
          throw new ValidationError(`No team found with name ${args.teamName}`);
        }
        user.teamList.splice(i, 1);
        user.save();
        return user.toJSON();
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
