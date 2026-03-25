import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: new URL('./src/partials', import.meta.url).pathname,
        }),
    ],
});