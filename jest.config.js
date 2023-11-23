module.exports = {
  preset: 'react-native',
  displayName: 'rn-use-modal',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  modulePathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: ['node_modules', 'src/index.ts'],
  transform: {
    '^.+\\.js$': require.resolve('react-native/jest/preprocessor.js'),
  },
};
