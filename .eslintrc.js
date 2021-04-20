module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jest/all', 'plugin:jest/style'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    complexity: ['error', 5],
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-mutable-exports': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
