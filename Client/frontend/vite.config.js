import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/backend' : {
        target : 'http://localhost:4000',
        secure : false,
      }
    }
  },
  plugins: [react()],
})
