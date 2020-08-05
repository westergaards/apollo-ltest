// https://jsonplaceholder.typicode.com/posts
const { ApolloServer, gql } = require("apollo-server-lambda")
const axios = require("axios").default

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: [Post]
  }

  type Post {
    userId: String
    id: String
    title: String
    body: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: async () => {
      let result = await axios.get("https://jsonplaceholder.typicode.com/posts")
      console.log("result", result)
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/dev/graphql",
  },
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
})
