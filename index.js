import { ApolloServer } from "apollo-server";
import redis from "redis";
import bluebird from "bluebird";

import { typeDefs, resolvers } from "./schema";

const client = redis.createClient();

bluebird.promisifyAll(redis);

client.on("connect", () => console.log("Connected to Redis..."));
client.on("error", err => console.log("Error: " + err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    client
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
