import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "SmartTax/docs",
  build: { 
    outDir: 'docs', // Set the build directory to 'docs'
  },
})
