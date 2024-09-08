import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {NextRequest} from 'next/server';
import {graphQlProxyTypeDefs} from "@/apollo/proxy/defs";
import {graphQlProxyResolvers} from "@/apollo/proxy/resolvers";

const server = new ApolloServer({
  resolvers: graphQlProxyResolvers,
  typeDefs: graphQlProxyTypeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({req}),
});

export {handler as GET, handler as POST};