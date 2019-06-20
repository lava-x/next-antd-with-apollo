import gql from 'graphql-tag';

export default gql`
  extend type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  extend type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }

  extend type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;
