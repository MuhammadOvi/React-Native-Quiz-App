module.exports = {
  env: {
    node: true, // this is the best starting point
    browser: true, // for react web
    es6: true, // enables es6 features
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  rules: {
    'no-console': 0,
    'no-plusplus': 'off',
    'react/jsx-one-expression-per-line': 'literal',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'sort-keys': 0,
    'sort-vars': 1,
    'linebreak-style': 0,
    'no-use-before-define': 0,
    'react/sort-comp': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'react/prop-types': 0,
  },
};
