import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
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
