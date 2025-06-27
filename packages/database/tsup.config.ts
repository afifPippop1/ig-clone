import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  outDir: 'dist',
  target: 'node20',
});
