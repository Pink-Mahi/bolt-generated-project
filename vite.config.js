import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/', // Adjust this if the deployment path is not root
    define: {
      // Explicitly pass environment variables for Vite
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    },
    server: {
      host: true, // Allow connections from the network
      port: 3000  // Local development port
    },
    preview: {
      host: true, // Allow connections during preview builds
      port: 3000  // Preview build port
    }
  };
});


