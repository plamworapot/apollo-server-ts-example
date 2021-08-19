import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    hello: () => 'hello'
  },
};

export default resolvers;