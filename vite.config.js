import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // Set this to your deployment path if not root
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000
  }
})
