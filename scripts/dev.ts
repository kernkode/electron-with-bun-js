import { spawn } from 'child_process';
import { build } from 'bun';
import chokidar from 'chokidar';

let electronProcess: ReturnType<typeof spawn> | null = null;

async function buildProject() {
  console.log('🔨 Compilando...');
  
  await build({
    entrypoints: ['./src/main.ts', './src/preload.ts', './src/renderer.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    external: ['electron'], // ← Aquí también
  });
  
  console.log('✅ Compilado');
}

function startElectron() {
  if (electronProcess) {
    electronProcess.kill();
  }
  
  electronProcess = spawn('electron', ['.', '--inspect=5858'], {
    stdio: 'inherit',
    shell: true,
  });
}

await buildProject();
startElectron();

chokidar.watch('./src/**/*.ts').on('change', async (path) => {
  console.log(`📝 Cambio detectado: ${path}`);
  await buildProject();
  startElectron();
});

process.on('SIGINT', () => {
  electronProcess?.kill();
  process.exit();
});