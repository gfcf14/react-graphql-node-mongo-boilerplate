const { gql } = require('apollo-server-express');
const TestDataSource = require('../../data-sources/test/test.js');

const testTypeDefs = gql`
type Query {
    hello: String
}
`;

const testResolvers = {
    Query: {
        hello: async () => {
            return await TestDataSource.test();
        },
    },
};

module.exports = { testTypeDefs, testResolvers };
