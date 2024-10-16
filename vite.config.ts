import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy({
            targets: ['>0.3%', 'defaults'],
        }),
    ],
    define: {
        global: 'window',
    },
    resolve: {
        alias: {
            // Try removing the eventemitter3 alias and allow Vite to handle it
        },
    },
    build: {
        minify: false, // Can change to `true` when in production mode
    },
    optimizeDeps: {
        exclude: [
            '@tronweb3/tronwallet-adapters',
            '@tronweb3/tronwallet-adapter-tronlink',
            '@tronweb3/tronwallet-abstract-adapter',
        ],
    },
    server: {
        host: '0.0.0.0',
        port: 5003,
    },
});
