import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://starwars-production-6ea2.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
