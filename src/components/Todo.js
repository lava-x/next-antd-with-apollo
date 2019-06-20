import React from 'react';
import classnames from 'classnames';

const Todo = ({ onClick, completed, text, id }) => (
  <div className="control">
    <a onClick={onClick}>
      <div className="tags has-addons">
        <span className="tag is-dark">{id}</span>
        <span
          className={classnames('tag', {
            'is-success': completed,
            'is-info': !completed,
          })}
        >
          {text}
        </span>
      </div>
    </a>
  </div>
);

export default Todo;
