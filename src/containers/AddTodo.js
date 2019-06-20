import React from 'react';
import { graphql } from 'react-apollo';
import { mutations } from 'graphql';

const { ADD_TODO } = mutations.Todos;
const AddTodo = ({ mutate, ...rest }) => {
  let input;

  return (
    <form
      {...rest}
      onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        mutate({ variables: { text: input.value } });
        input.value = '';
      }}
    >
      <div className="field has-addons is-grouped is-grouped-centered">
        <div className="control">
          <input
            ref={(node) => {
              input = node;
            }}
            className="input is-medium"
            type="text"
            placeholder="What to do?"
          />
        </div>
        <div className="control ">
          <button type="submit" className="button is-primary is-medium">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default graphql(ADD_TODO)(AddTodo);
