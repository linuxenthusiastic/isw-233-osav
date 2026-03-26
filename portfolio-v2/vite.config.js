import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
    ],
});