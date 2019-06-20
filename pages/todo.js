import React, { Component } from 'react';
import AddTodo from 'containers/AddTodo';
import VisibleTodoList from 'containers/VisibleTodoList';
import FilterLink from 'containers/FilterLink';

class Index extends Component {
  render() {
    return (
      <div className="full-height-min has-text-centered pl20 pl20">
        <AddTodo className="mt20 mb20" />
        <p>
          Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
          {', '}
          <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
          {', '}
          <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
        </p>
        <VisibleTodoList />
      </div>
    );
  }
}

export default Index;
