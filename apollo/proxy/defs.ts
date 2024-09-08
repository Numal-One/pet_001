import {gql} from "graphql-tag";

export const graphQlProxyTypeDefs = gql`
  type Query {
    hello: String
  }
`;