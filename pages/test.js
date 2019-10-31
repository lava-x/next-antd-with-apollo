import React from 'react';
const backgroundColor = '#eee';

export default () => (
  <div className="hello full-height-min flex-vertical-center">
    <p>Hello World</p>
    <div className="field">
      <div className="control is-large is-loading">
        <input
          className="input is-large"
          type="text"
          placeholder="Large loading input"
        />
      </div>
    </div>
  </div>
);
