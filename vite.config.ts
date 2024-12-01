import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/InflationViz/",
  build: {
    rollupOptions: {
      external: [
        "d3", 
      ],
    },
  },
})
