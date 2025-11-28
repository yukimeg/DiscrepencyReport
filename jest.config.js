// jest.config.js
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  globals: {
    "ts-jest": {
      useESM: true
    }
  },

  transform: {
    "^.+\\.ts$": "ts-jest"
  },

  roots: ["<rootDir>/src"],
  testMatch: ["**/test/**/*.test.ts", "**/?(*.)+(spec|test).ts"]
};
