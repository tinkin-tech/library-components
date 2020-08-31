module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.tsx',
    '**/*.tsx',
    '!**/*.stories.tsx',
    '!**/*.fixture.tsx',
  ],
  testEnvironment: 'jsdom',
}
