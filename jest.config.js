process.env.TZ = 'GMT'

module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.tsx',
    '**/*.ts',
    '!**/*.stories.tsx',
    '!**/*.fixture.tsx',
  ],
  testEnvironment: 'jsdom',
}
