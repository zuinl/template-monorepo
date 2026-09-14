import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout";
//@ts-expect-error Importado como string para Vite
import microfrontendLayout from "./microfrontend-layout.html?raw";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log("App name:", name);
    return import(/* @vite-ignore */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
