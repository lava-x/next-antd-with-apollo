import fetch from "isomorphic-unfetch";
import { resolvers, typeDefs } from "graphql";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { GRAPHQL_ENDPOINT } from "config/constant";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, { getToken }) {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const cache = new InMemoryCache().restore(initialState);
  const client = new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    connectToDevTools: typeof window !== "undefined",
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            // eslint-disable-next-line
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        // eslint-disable-next-line
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      authLink,
      new HttpLink({
        uri: GRAPHQL_ENDPOINT, // Server URL (must be absolute)
        credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
      })
    ]),
    typeDefs,
    resolvers: resolvers.resolvers,
    cache
  });
  cache.writeData({
    data: resolvers.defaults
  });

  return client;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export default function initApolloClient(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, options);
  }

  return apolloClient;
}
