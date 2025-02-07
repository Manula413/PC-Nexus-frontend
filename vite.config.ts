import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [!process.env.VITEST && remix()],

  test: {
    environment: 'jsdom',  // default for React component tests
    globals: true,
    setupFiles: './setupTests.ts', // any global setup if needed
    include: ['app/tests/client/**/*.{test,spec}.ts{,x}'], // Include only client-side test files
    exclude: ['app/tests/server/**/*.{test,spec}.ts{,x}'], // Exclude server-side test files
  },
});
