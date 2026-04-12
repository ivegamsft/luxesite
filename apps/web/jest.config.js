const path = require('path');
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../tests/jest.setup.ts'],
  roots: ['<rootDir>/../../tests/unit'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', path.resolve(__dirname, 'node_modules')],
};

module.exports = createJestConfig(customJestConfig);
