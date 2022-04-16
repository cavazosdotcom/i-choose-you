const { AuthenticationError } = require('apollo-server-express');
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
        console.log(args);
        user.teamList.push(args);
        user.save()
        return user.toJSON();
      }
    },
    addPokemon: async (parent, args, context) =>{
      if(context.user) {
        const user = await User.findOne({ _id: context.user._id });
        user.teamList.map((team) => {
          if(args.teamName === team.teamName) {
            team.pokemonList.push({pokeName: args.pokeName, typeList: args.typeList});
          }
        })
        user.save();
        return user.toJSON();
      }
    },
    removePokemon: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findOne({ _id: context.user._id });
        user.teamList.map((team) => {
          if(args.teamName === team.teamName) {
            const i = team.pokemonList.findIndex((pokemon) => pokemon.pokeName === args.pokeName);
            team.pokemonList.splice(i);
          }
        })
        user.save();
        return user.toJSON();
      }
      throw new AuthenticationError('You need to be logged in!');  
    }
  }
};

module.exports = resolvers;
