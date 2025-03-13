import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    clearScreen: false,
    server: {
        strictPort: true,
        port: 3000,
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
        target: ['es2021', 'chrome100', 'safari13'],
        minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    },
    plugins: [react(), tailwindcss()],
});
