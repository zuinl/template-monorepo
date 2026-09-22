import { defineConfig } from "vite-plus";
import { createMfeConfig, APP_PORTS } from "@libs/vite-common";
import { name } from "./package.json";

export default defineConfig(
  createMfeConfig({
    entry: "./src/main.tsx",
    port: APP_PORTS[name],
  }),
);
