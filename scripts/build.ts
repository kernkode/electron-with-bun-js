import { build } from 'bun';

await build({
  entrypoints: ['./src/main.ts', './src/preload.ts', './src/renderer.ts'],
  outdir: './dist',
  target: 'node',
  format: 'cjs',
  external: ['electron'], // ← Importante: no empaquetar electron
});