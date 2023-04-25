import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import * as path from 'path'

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        port: 4000,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
})
