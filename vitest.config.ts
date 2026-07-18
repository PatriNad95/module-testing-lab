import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/cypress/**', '**/e2e/**', '**/dist/**'],
  },
});
