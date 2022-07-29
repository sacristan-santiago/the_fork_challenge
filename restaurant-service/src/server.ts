import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import config from 'config';
import { Query } from './queries';

const typeDefs = gql`
  type Restaurant {
    restaurantUuid: String
    name: String
    country: Country
    images: [String]
    allowReview: Boolean
  }

  type Pagination {
    total: Int
    pageCount: Int
    currentPage: Int
  }

  type Country {
    code: String
    locales: [String]
  }

  type RestaurantOutput {
    restaurants: [Restaurant]
    pagination: Pagination
  }

  type Query {
    restaurants(name: String, imageOnly: Boolean, page: Int, size: Int): RestaurantOutput
  }
`;

const query = new Query()

const resolvers = {
  Query: {
    restaurants: (_parent: undefined, args: any) => (
      query.findRestaurants(args.name, args.imageOnly, args.page, args.size).then((data) => data)
    ),
  },

  
}

const main = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${
      server.graphqlPath
    }`,
  ));
};

main().catch((error) => {
  console.error('Server failed to start', error);
});
