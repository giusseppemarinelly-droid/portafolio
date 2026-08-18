import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    /**
     * El proyecto vive en el disco de Windows montado en WSL (`/mnt/c/...`), y ese
     * sistema de archivos no emite eventos inotify: sin sondeo, Vite no se entera
     * de ningún cambio y sigue sirviendo el módulo que cargó al arrancar — la
     * página se queda igual por mucho que se guarde y se recargue.
     */
    watch: { usePolling: true, interval: 300 },
  },
})
