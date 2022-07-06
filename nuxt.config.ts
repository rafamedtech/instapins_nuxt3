import { defineNuxtConfig } from 'nuxt';
import { resolve } from 'path';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],

  buildModules: ['@pinia/nuxt', '@nuxtjs/supabase'],

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  alias: {
    icons: resolve(__dirname, 'node_modules/vue-material-design-icons'),
  },
});
