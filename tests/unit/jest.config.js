const path = require('path');
const webRoot = path.resolve(__dirname, '../../apps/web');
const nextJest = require(require.resolve('next/jest', { paths: [webRoot] }));

const createJestConfig = nextJest({
  dir: webRoot,
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': path.join(webRoot, '$1'),
  },
  moduleDirectories: ['node_modules', path.resolve(webRoot, 'node_modules')],
};

module.exports = createJestConfig(customJestConfig);
