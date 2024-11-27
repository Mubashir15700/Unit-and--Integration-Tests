import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Use jest-environment-jsdom as the environment for testing React components
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // Add this line if using absolute imports or aliasing in Vite
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"], // Ignore node_modules and build folders
};

export default config;
