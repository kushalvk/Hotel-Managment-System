import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': 'https://solid-space-adventure-5gq5457g7jv7c7xxj-3001.app.github.dev',
  //   },
  // },
  plugins: [react()],
})
