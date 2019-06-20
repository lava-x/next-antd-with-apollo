import gql from 'graphql-tag';

export const GET_TODOS = gql`
  query GetTodos {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
  }
`;

export const GET_FILTER = gql`
  query {
    visibilityFilter @client
  }
`;

export default {
  GET_TODOS,
  GET_FILTER,
};
