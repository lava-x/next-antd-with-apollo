import gql from 'graphql-tag';

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

export const SET_TODO_FILTER = gql`
  mutation SetFilter($filter: String!) {
    visibilityFilter(filter: $filter) @client
  }
`;

export default {
  ADD_TODO,
  TOGGLE_TODO,
  SET_TODO_FILTER,
};
