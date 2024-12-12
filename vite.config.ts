import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/docs/', // Set the correct base path for your app
  build: {
    outDir: 'docs', // Set the build directory to 'docs'
  },
})
