import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Next dev server
    supportFile: false,
    specPattern: "cypress/e2e/**/*.spec.ts",
  },
});
