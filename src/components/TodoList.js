import React from 'react';
import Todo from 'components/Todo';

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </div>
  );
};

export default TodoList;
