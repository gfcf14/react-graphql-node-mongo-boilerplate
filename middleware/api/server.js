const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { createServer } = require('http');
const cors = require('cors');
const { testTypeDefs, testResolvers } = require('../src/graphql/resolvers/test/test.js');

const server = new ApolloServer({
  typeDefs: [testTypeDefs],
  resolvers: [testResolvers],
  introspection: true,
  playground: true
});
const app = express();

app.use(cors());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
  app.get('/', (req, res) => res.redirect('/playground'));

  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/playground`));
  }
}

startServer();

const requestHandler = app;
const vercelServer = createServer((req, res) => requestHandler(req, res));

module.exports = vercelServer;
