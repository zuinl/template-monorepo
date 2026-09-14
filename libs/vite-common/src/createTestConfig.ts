import type { UserConfig } from "vite-plus";

const DEFAULT_TEST_INCLUDE = ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"];
const DEFAULT_TEST_CONFIG: NonNullable<UserConfig["test"]> = {
  environment: "jsdom",
  globals: true,
  environmentOptions: {
    jsdom: {
      url: "http://localhost/",
    },
  },
  include: DEFAULT_TEST_INCLUDE,
  clearMocks: true,
  mockReset: true,
  coverage: {
    thresholds: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

export type CreateTestConfigOptions = UserConfig["test"];

export function createTestConfig(options?: CreateTestConfigOptions): UserConfig["test"] {
  const defaultEnvironmentOptions = DEFAULT_TEST_CONFIG.environmentOptions ?? {};
  const customEnvironmentOptions = options?.environmentOptions ?? {};

  return {
    ...DEFAULT_TEST_CONFIG,
    ...options,
    environmentOptions: {
      ...defaultEnvironmentOptions,
      ...customEnvironmentOptions,
      jsdom: {
        ...defaultEnvironmentOptions.jsdom,
        ...customEnvironmentOptions.jsdom,
      },
    },
  };
}
