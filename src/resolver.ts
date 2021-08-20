import { IResolvers } from "graphql-tools";
import { ContextType } from './types'

const resolvers: IResolvers<any, ContextType> = {
  Query: {
    hello: () => 'hello',
    profiles: (_, __, { dataSources }) => {
      return dataSources.friendDataSource.getProfiles();
    },
    me: async (_, __, { dataSources }) => {
      const user = await dataSources.friendDataSource.getCurrentUser();
      return dataSources.friendDataSource.getProfileByUserId(user.id);
    },
    product: () => {
      return [{
        sku: "TEST_SKU",
        name: "Product Name",
        type: "simple",
        qty: 10,
      },{
        sku: "TEST_SKU_2",
        name: "Product Name",
        type: "configulable",
        childrenSku: [ "1234" ],
      }]
    }
  },
  Mutation: {
    register: async (_, { input }, { dataSources }) => {
      const respose = await dataSources.friendDataSource.register(input);
      return respose;
    }
  },
  // Simple on Product case
  Product: {
    __resolveType(root: any) {
      if(root.type === 'simple') return 'SimpleProduct'
      return 'ConfigulableProduct';
    },
  },
  ConfigulableProduct: {
    children: (root) => {
      console.log(root);
      return [{
        sku: "1234",
        name: "Product Name",
        type: "simple",
        qty: 12,
      }]
    }
  },
  User: {
    follows: async (root,_, { dataSources }) => {
      const follows = await dataSources.friendDataSource.getFollowsByUserId(root.id);
      const users = Promise.all(follows.map(({follow_id}: any) => {
        return dataSources.friendDataSource.getProfileByUserId(follow_id);
      }))
      return users;
    }
  }
};

export default resolvers;