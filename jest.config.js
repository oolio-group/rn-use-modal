module.exports = {
  preset: 'react-native',
  displayName: 'rn-use-modal',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  modulePathIgnorePatterns: ['lib'],
  coveragePathIgnorePatterns: ['node_modules', 'src/index.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native)|react-native-modal|react-native-fabric|)',
  ],
  transform: {
    '^.+\\.js$': require.resolve('react-native/jest/preprocessor.js'),
  },
};
