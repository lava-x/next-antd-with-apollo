import gql from 'graphql-tag';
import { queries } from '../';

let nextTodoId = 0;
const todos = {
  defaults: {
    todos: [],
  },
  resolvers: {
    Mutation: {
      addTodo: (_, { text }, { cache }) => {
        const { GET_TODOS } = queries.Todos;
        const previous = cache.readQuery({ query: GET_TODOS });
        const newTodo = {
          id: nextTodoId++,
          text,
          completed: false,
          __typename: 'TodoItem',
        };
        const data = {
          todos: previous.todos.concat([newTodo]),
        };
        cache.writeData({ data });
        return newTodo;
      },
      toggleTodo: (_, variables, { cache }) => {
        const id = `TodoItem:${variables.id}`;
        const fragment = gql`
          fragment completeTodo on TodoItem {
            completed
          }
        `;
        const todo = cache.readFragment({ fragment, id });
        const data = { ...todo, completed: !todo.completed };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
};

export default todos;
