module.exports = {
  root: true,
  extends: ['@tinkin', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  rules: {
    'no-extra-parens': 0,
    'filenames/match-regex': 0,
    'no-restricted-globals': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'filenames/match-exported': 0,
  },
}
