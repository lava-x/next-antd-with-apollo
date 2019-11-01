module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': [0],
    'react/prefer-stateless-function': [0],
    'jsx-a11y/anchor-is-valid': [0],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/core-modules': ['styled-jsx/css'],
  },
};
