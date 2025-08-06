import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({template: { transformAssetUrls }}),
    tailwindcss(),
    quasar({sassVariables: fileURLToPath( new URL('./src/styles/quasar-variables.sass', import.meta.url) )})
  ]
})

