import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // Adjust this if the deployment path is not root
  define: {
    // Pass environment variables explicitly for Vite
    'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY)
  },
  server: {
    host: true, // Allow connections from the network
    port: 3000  // Local development port
  },
  preview: {
    host: true, // Allow connections during preview builds
    port: 3000  // Preview build port
  }
})

