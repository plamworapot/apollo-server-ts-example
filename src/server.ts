import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { FriendDataSource } from './FriendDataSource'

const app = express();

const server = new ApolloServer({
  schema,
  context: ({
    req
  }) => {
    const authorization = req.headers.authorization;
    return {
      authorization,
    }
  },
  dataSources: () => {
    return {
      friendDataSource: new FriendDataSource()
    }
  }

});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 5000 }, () => {
  console.log("Apollo Server on http://localhost:5000/graphql");
});