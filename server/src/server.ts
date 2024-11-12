import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import type { Request, Response } from 'express';
import {
  ApolloServer,
} from '@apollo/server';
import {
  expressMiddleware
} from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async () => {
  await server.start();
 await db;
 app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use ('/graphql', expressMiddleware(server as any,
{
  context: authenticateToken as any
}
));


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
}

startApolloServer();

