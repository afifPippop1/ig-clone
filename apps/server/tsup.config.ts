// apps/server/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // 👈 force ESM
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'node20',
  minify: true,
  treeshake: true,
});
