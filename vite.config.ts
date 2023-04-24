import vercel from 'solid-start-vercel'
import solid from 'solid-start/vite'
import {defineConfig} from 'vite'

export default defineConfig({
    server: {port: 4000},
    plugins: [solid({adapter: vercel({})})],
})
