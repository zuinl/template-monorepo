import { type UserConfig } from "vite-plus";

import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

import { createExternalMatcher } from "./createExternalMatcher.ts";
import { createTestConfig } from "./createTestConfig.ts";
import singleSpaDevPlugin from "./singleSpaDevPlugin.ts";
import { findUpAll } from "./findUpAll.ts";

const LOCALHOST_CERT_FILE = "localhost.pem";
const LOCALHOST_KEY_FILE = "localhost-key.pem";

function findWorkspaceRoot(startDir: string) {
  return (
    findUpAll(["pnpm-workspace.yaml"], startDir) ||
    findUpAll(["package.json"], startDir) ||
    startDir
  );
}

function findCertificateDirectory(startDir: string) {
  const dir = findUpAll([LOCALHOST_CERT_FILE, LOCALHOST_KEY_FILE], startDir);

  if (!dir) return undefined;

  return {
    certPath: path.join(dir, LOCALHOST_CERT_FILE),
    keyPath: path.join(dir, LOCALHOST_KEY_FILE),
  };
}

function resolveHttpsConfig(startDir: string) {
  const certificatePaths = findCertificateDirectory(startDir);

  if (!certificatePaths) {
    return undefined;
  }

  return {
    key: fs.readFileSync(certificatePaths.keyPath),
    cert: fs.readFileSync(certificatePaths.certPath),
  };
}

export interface CreateMfeConfigOptions {
  entry: string;
  port: number;
  fileName?: string;
  additionalExternals?: string[];
  test?: UserConfig["test"];
}

export function createMfeConfig(options: CreateMfeConfigOptions): UserConfig {
  const cwd = process.cwd();
  const workspaceRoot = findWorkspaceRoot(cwd);
  const entry = options.entry ?? "src/main.tsx";
  const fileName = options.fileName ?? "main";
  const appName = path.basename(cwd);
  const version = process.env.APP_VERSION;
  const appOutputDir = version
    ? path.join(workspaceRoot, "dist", appName, version)
    : path.join(workspaceRoot, "dist", appName);
  const externalMatcher = createExternalMatcher(options.additionalExternals);
  const nodeEnv = process.env.VITEST ? "test" : "production";
  const isTest = nodeEnv === "test";

  return {
    envDir: workspaceRoot,
    envPrefix: "APP_",
    define: {
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    },
    resolve: {
      preserveSymlinks: false,
      tsconfigPaths: true,
    },
    server: {
      port: options.port,
      cors: true,
      https: resolveHttpsConfig(cwd),
    },
    plugins: [react({}), !isTest && singleSpaDevPlugin()].filter(Boolean),
    test: createTestConfig(options.test),
    build: {
      outDir: appOutputDir,
      emptyOutDir: false,
      rolldownOptions: {
        external: externalMatcher,
      },
      lib: { entry, fileName, formats: ["es"] },
    },
  } as UserConfig;
}

export { APP_PORTS } from "./ports.ts";
