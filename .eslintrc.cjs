module.exports = {
  root: true,
  extends: ['@tinkin', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'no-extra-parens': 0,
    'filenames/match-regex': [
      'error',
      new RegExp(
        '^[^0-9][a-zA-Z0-9]*(.test|.d|.types|.stories)?$|' +
          '^webpack.config$|^.eslintrc$|^jest.config$',
        'g'
      ),
    ],
  },
}
