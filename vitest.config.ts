// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Correct environment for React component testing
    mockReset: true, // Automatically reset mocks between tests (optional, but can help)
  },
});
