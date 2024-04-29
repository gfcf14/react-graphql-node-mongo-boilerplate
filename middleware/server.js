const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const typeDefs = gql`
type Query {
    hello: String
}
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    // Serve the GraphQL Playground at the /playground URL
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}/playground`)
    );
}

startServer();
