import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import resolvers from './controllers';
import { UserIDMiddleware, UserMiddleware } from './middleware/Users';
import { GQLCtx } from './ts/gql';
import { Request, Response } from './ts/express';

async function main() {
  const connection = await createConnection();
  const app = express();

  app.use(cors());

  const schema = await buildSchema({ resolvers, validate: false });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: { req: Request; res: Response }): GQLCtx => ({
      req,
      res,
      user: req.user
    })
  });

  app.use(cookieParser());

  app.use(UserIDMiddleware);
  app.use(UserMiddleware);

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Listening on http://localhost:4000');
  });
}

main();
