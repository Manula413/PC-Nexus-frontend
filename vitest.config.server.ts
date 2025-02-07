import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],

  test: {
    environment: 'node',  // This is for server-side tests like Prisma
    include: ['app/tests/server/**/*.{test,spec}.ts{,x}'], // Include only server-side test files
    exclude: ['app/tests/client/**/*.{test,spec}.ts{,x}'], // Exclude client-side test files
  },
});
