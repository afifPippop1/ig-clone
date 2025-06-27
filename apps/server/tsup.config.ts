// apps/server/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // 👈 force ESM
  splitting: false, // 👈 optional for Node ESM
  sourcemap: true,
  clean: true,
  dts: false,
  target: 'node20', // 👈 this is important
});
