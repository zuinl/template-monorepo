import type { Plugin } from "vite-plus";

import fs from "node:fs";
import { defineConfig, loadEnv } from "vite-plus";

import {
  externalImportMapPlugin,
  importMapInlinePlugin,
  importMapPlaygroundPlugin,
} from "./vite-plugins";

/**
 * Pacotes resolvidos em runtime pelo import map, nunca empacotados pelo Vite.
 * Mesma lista é usada em dev (`externalImportMapPlugin`) e em build (`build.rolldownOptions.external`).
 */
const EXTERNALS = [
  "react",
  "react-dom",
  "single-spa",
  "single-spa-react",
  "@mui/material",
  "@emotion/react",
  "@emotion/styled",
] as const;

const ignorePatterns = [
  "**/dist/**",
  "**/coverage/**",
  "**/node_modules/**",
  "public/**",
  "pnpm-lock.yaml",
];

const configServerOptions = {
  port: 8080,
  cors: true,
  https: fs.existsSync("./localhost-key.pem")
    ? {
        key: fs.readFileSync("./localhost-key.pem"),
        cert: fs.readFileSync("./localhost.pem"),
      }
    : undefined,
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const importMapPlayground = process.env.IMPORTMAP_PLAYGROUND ?? env.IMPORTMAP_PLAYGROUND;
  const isPlayground = importMapPlayground === "1" || mode === "development";

  const plugins: Plugin[] = [
    externalImportMapPlugin(EXTERNALS),
    importMapInlinePlugin(env.VITE_IMPORTMAP_URL),
    importMapPlaygroundPlugin(isPlayground),
  ];

  return {
    staged: { "*": "vp check --fix" },
    run: {
      enablePrePostScripts: true,
    },
    fmt: {
      ignorePatterns,
      trailingCommas: "all",
      sortPackageJson: true,
      sortImports: {
        newlinesBetween: true,
        groups: [
          "type-import",
          ["value-builtin", "value-external"],
          "type-internal",
          "value-internal",
          ["type-parent", "type-sibling", "type-index"],
          ["value-parent", "value-sibling", "value-index"],
          "unknown",
        ],
      },
    },
    preview: configServerOptions,
    server: configServerOptions,
    build: {
      rolldownOptions: {
        external: [...EXTERNALS],
      },
    },
    lint: {
      ignorePatterns,
      options: { typeAware: true, typeCheck: true },
    },
    test: {
      globals: true,
    },
    plugins,
  };
});
