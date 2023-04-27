import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import * as path from 'path'
import devtools from 'solid-devtools/vite'

export default defineConfig({
    plugins: [
        devtools({
            autoname: true,
        }),
        solid(),
    ],
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
