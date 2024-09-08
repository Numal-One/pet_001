import {Resolvers} from "@/apollo/proxy/types";

export const graphQlProxyResolvers: Resolvers = {
  Query: {
    hello: () => 'world',
  },
};