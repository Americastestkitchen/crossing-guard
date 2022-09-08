module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'airbnb-base'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'class-methods-use-this': 0,
    'func-names': 0,
    'guard-for-in': 0,
    'indent': ['error', 2],
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-loop-func': 0,
    'no-restricted-syntax': 0,
    'no-undef': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
