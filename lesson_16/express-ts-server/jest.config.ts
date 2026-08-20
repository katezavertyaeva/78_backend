import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  setupFiles: ["./test/setup.ts"],
  clearMocks: true,
  transformIgnorePatterns: ["node_modules/(?!(uuid)/)"],
};

export default config;
