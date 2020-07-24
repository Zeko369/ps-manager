import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./controllers/BookResolver";

async function main() {
  const connection = await createConnection();
  const schema = await buildSchema({ resolvers: [BookResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Listening on http://localhost:4000");
}
