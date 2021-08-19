import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";

const app = express();

const server = new ApolloServer({
  schema,
  playground: true,
  context: ({ req }) => {
    return {
        header: req.header,
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 5000 }, () => {
  console.log("Apollo Server on http://localhost:5000/graphql");
});