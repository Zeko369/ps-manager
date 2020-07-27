import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import resolvers from './controllers';

async function main() {
  const connection = await createConnection();
  const app = express();

  app.use(cors());

  const schema = await buildSchema({ resolvers, validate: false });
  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
  });
}

main();
