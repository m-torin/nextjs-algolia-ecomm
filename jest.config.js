module.exports = {
  setupFiles: [
    '<rootDir>/jest.setup.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/semantic-ui/'
  ],
  testMatch: [
    "**/*.steps.js",
    "**/*.test.js"
  ],
  moduleFileExtensions: [
    "js",
    "jsx"
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  reporters: ["default"],
}