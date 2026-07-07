import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('pdf')) {
              return 'pdf';
            }
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
