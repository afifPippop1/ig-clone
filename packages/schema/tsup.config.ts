import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'node20',
  minify: true,
  treeshake: true,
});
