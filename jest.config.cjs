/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(node-fetch)/)", // List problematic ESM packages here
  ],
  "extensionsToTreatAsEsm": [".ts", ".tsx"]
};
