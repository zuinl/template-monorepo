import { defineConfig } from "vite-plus";

export default defineConfig({
  create: {
    templates: [
      {
        name: "Application generator",
        description: "Cria uma nova aplicação no padrão do monorepo",
        template: "./tools/app-template",
      },
    ],
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: false, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
