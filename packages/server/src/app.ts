import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import resolvers from "./controllers";

async function main() {
  const connection = await createConnection();
  const schema = await buildSchema({ resolvers });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Listening on http://localhost:4000");
}

main();
