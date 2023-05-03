import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    react(), 
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  define: {'process.env' : {}}
})
