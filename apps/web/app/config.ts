const { GRAPHQL_URL } = process.env;

export const config = {
  GRAPHQL_URL: GRAPHQL_URL || 'http://localhost:4000/graphql',
};
