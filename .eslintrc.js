module.exports = {
  root: false,

  env: {
    node: true,
    jest: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': 0,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
