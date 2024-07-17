import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: [resolve(__dirname, 'lib/index.ts')],
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            output: {
                preserveModules: true,
            },
        },
    },
});