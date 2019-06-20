import { graphql, compose } from 'react-apollo';
import TodoList from 'components/TodoList';
import { queries, mutations } from 'graphql';

const { GET_TODOS } = queries.Todos;
const { TOGGLE_TODO } = mutations.Todos;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const withTodos = graphql(GET_TODOS, {
  props: ({ data }) => {
    if (data.loading || data.error) return { todos: [] };
    return {
      todos: getVisibleTodos(data.todos, data.visibilityFilter),
    };
  },
});

const withToggleTodo = graphql(TOGGLE_TODO, {
  props: ({ mutate }) => {
    return {
      onTodoClick: (id) => mutate({ variables: { id } }),
    };
  },
});

export default compose(
  withTodos,
  withToggleTodo
)(TodoList);
