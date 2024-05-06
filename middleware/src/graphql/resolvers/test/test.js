const { gql } = require('apollo-server-express');
const TestDataSource = require('../../data-sources/test/test.js');

const testTypeDefs = gql`
type UserData {
  name: String
  userId: String
}
type Response {
  message: String
  data: [UserData]
}
type Query {
  test: Response
}
`;

const buildTestResponse = (response) => {
  return {
    message: `FE integrated successfully with Middleware! ${response.message}`,
    data: response.data
  };
}

const testResolvers = {
  Query: {
    test: async () => {
      const response = await TestDataSource.test();
      return buildTestResponse(response);
    },
  },
};

module.exports = { testTypeDefs, testResolvers };
