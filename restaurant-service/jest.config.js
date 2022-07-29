module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['json'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  testEnvironment: 'node',
  roots: ['./src'],
  preset: 'ts-jest/presets/js-with-ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
