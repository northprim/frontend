import {defineConfig} from 'vite';
import {resolve} from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
    server: {
        open: true,
        port: 3000,
        strictPort: true,
    },
    build: {
        lib: {
            // TODO: explain why we use an array with one entry.
            entry: [resolve(__dirname, 'lib/index.ts')],
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            output: {
                preserveModules: true,
            },
        },
    },
    plugins: [dts()]
});