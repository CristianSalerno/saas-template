import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["server/**/*.ts"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};

export default config;
