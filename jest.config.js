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
    '!./index.ts',
    '!./stories/index.ts',
    '!./stories/MapLocations/GoogleMapsMock.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: 'jsdom',
}
