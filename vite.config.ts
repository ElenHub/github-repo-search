import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/github-repo-search/', 
  build: {
    outDir: 'dist',
  },
})