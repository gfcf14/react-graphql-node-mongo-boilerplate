const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { createServer } = require('http');
const cors = require('cors');

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
});
const app = express();

// Apply CORS middleware globally or specifically to the GraphQL route
app.use(cors());

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    // Serve the GraphQL Playground at the /playground URL
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    // Only listen on HTTP port in local development, not when deployed on Vercel
    if (!process.env.VERCEL) {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () =>
            console.log(`🚀 Server ready at http://localhost:${PORT}/playground`)
        );
    }
}

startServer();

// For Vercel deployment, export the server as a module
const requestHandler = app;
const vercelServer = createServer((req, res) => {
    return requestHandler(req, res);
});

module.exports = vercelServer;