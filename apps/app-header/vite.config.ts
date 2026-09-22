import { defineConfig } from "vite-plus";
import { APP_PORTS } from "../../libs/vite-common/src/ports";
import { createMfeConfig } from "../../libs/vite-common/src/index";
import { name } from "./package.json";

export default defineConfig(
  createMfeConfig({
    entry: "./src/main.tsx",
    port: APP_PORTS[name],
  }),
);
