module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    complexity: ['error', 5],
    'no-var': 'off',

    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-mutable-exports': 'off',
  },
};
